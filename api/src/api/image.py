import json
import os
import glob

from flask import request

from src import *
from src.helper import response, log
from src.helper.timer import Timer
from src.services import image_service, keras_service, index_service, cluster_service, blurry_service


def download():
    try:
        with Timer('Validate input'):
            request_json = request.json
            batch_id = response.get('batch_id', request_json)
            image_base64 = response.get('image_base64', request_json)
            image_id = response.get('image_id', request_json)
            if not all([batch_id, image_base64, image_id]):
                log.error(f'Error while getting parameters in {download.__name__} function: {request_json}')
                return response.make(error=True, message=MESSAGE_ERROR_PARAMETERS)

        with Timer('Download image'):
            image_path = image_service.download(batch_id, image_id, image_base64)
            if not image_path:
                log.error(f'Error while downloading image in {download.__name__} function: {image_path}')
                return response.make(error=True, message=MESSAGE_ERROR_DOWNLOAD)

        log.info(f'Image downloaded: {image_path}')
        return response.make(error=False, response=dict(message=MESSAGE_OK))

    except Exception as e:
        log.error(f'Exception while processing {download.__name__} function: [{e}]')
        log.exception(e)
        return response.make(error=True, message=MESSAGE_ERROR)


def cluster(batch_id):
    try:
        with Timer('Validate input'):
            folder_path = f'{DATA_FOLDER}/{batch_id}'
            if not os.path.exists(folder_path):
                log.error(f'Error while validating parameters in {cluster.__name__} function: {folder_path}')
                return response.make(error=True, message=MESSAGE_ERROR_BATCH)

        with Timer('Retrieve images'):
            images = glob.glob(f'{folder_path}/*{IMAGE_FORMAT}')
            images.sort()
            if not images:
                log.error(f'No images found in {batch_id} batch.')
                return response.make(error=True, message=MESSAGE_ERROR_BATCH_IMAGES)

        with Timer('Extract features'):
            features = keras_service.extract_features(images)
            if len(images) != len(features):
                log.error(f'Not all features could be obtained from all images: [{len(images)}] != [{len(features)}]')
                return response.make(error=True, message=MESSAGE_ERROR_FEATURES)

        with Timer('Create index'):
            index_path = index_service.build(features, batch_id)
            if not index_path:
                log.error(f'Nmslib could not be built: [{index_path}]')
                return response.make(error=True, message=MESSAGE_ERROR_INDEX)

        with Timer('Find clusters'):
            clusters = cluster_service.find(index_path, features, images, batch_id)
            if not clusters:
                log.error(f'Clusters could not be formed: [{clusters}]')
                return response.make(error=True, message=MESSAGE_ERROR_CLUSTER)

        log.info(f'Cluster completed')
        return response.make(error=False, response=dict(cluster=clusters))

    except Exception as e:
        log.error(f'Exception while processing {cluster.__name__} function: [{e}]')
        log.exception(e)
        return response.make(error=True, message=MESSAGE_ERROR)


def clean(batch_id, cluster_id):
    try:
        with Timer('Validate input: batch_id'):
            folder_path = f'{DATA_FOLDER}/{batch_id}'
            if not os.path.exists(folder_path):
                log.error(f'Error while validating parameters in {clean.__name__} function: {folder_path}')
                return response.make(error=True, message=MESSAGE_ERROR_BATCH)

        with Timer('Validate input: cluster_id'):
            cluster_json_file_name = f'{DATA_FOLDER}/{batch_id}/{CLUSTER_JSON_FILE_NAME}'
            if not os.path.exists(cluster_json_file_name):
                log.error(f'Error while validating parameters in {clean.__name__} function: {cluster_json_file_name}')
                return response.make(error=True, message=MESSAGE_ERROR_CLUSTER)
            with open(cluster_json_file_name) as json_file:
                cluster_list = json.load(json_file)
            if cluster_id not in cluster_list:
                log.error(f'{cluster_id} not found in the list of clusters.')
                return response.make(error=True, message=MESSAGE_ERROR_CLUSTER_NOT_FOUND)
            selected_cluster = cluster_list[cluster_id]

        with Timer('Clean cluster'):
            selected_image = blurry_service.get_best_image(batch_id, selected_cluster)
            if not selected_image:
                log.error(f'Error getting the best image: {selected_image}')
                return response.make(error=True, message=MESSAGE_ERROR_CLEAN)

        log.info(f'Clean completed')
        return response.make(error=False, response=dict(image=selected_cluster[0]))

    except Exception as e:
        log.error(f'Exception while processing {clean.__name__} function: [{e}]')
        log.exception(e)
        return response.make(error=True, message=MESSAGE_ERROR)
