import json

from src import *
from src.helper import log
from src.services import image_service
from src.services.nmslib_service import Nmslib


def find(index_path, features, images, batch_id):
    try:
        index = Nmslib()
        index.load(fn=index_path)

        next_identifier = 0
        clusters = {}
        image_to_cluster = {}
        for i, feature_array in enumerate(features):
            vector_arrays = image_service.list_to_numpy_array(feature_array)
            closest, distances = index.query(vector_arrays, len(features))

            similar = {i}
            for j, dist in zip(closest, distances):
                if j != i:
                    if dist < DISTANCE_THRESHOLD:
                        similar.add(int(j))

            matching_clusters = set()
            for j in similar:
                if j in image_to_cluster:
                    matching_clusters.add(image_to_cluster[j])

            for cluster in matching_clusters:
                similar.update(clusters.pop(cluster))

            cluster_id = next_identifier
            next_identifier += 1

            clusters[cluster_id] = similar
            for j in similar:
                image_to_cluster[j] = cluster_id

        similar_clusters = [list(cluster) for cluster in clusters.values()]
        for i in range(0, len(similar_clusters)):
            for j in range(0, len(similar_clusters[i])):
                similar_clusters[i][j] = images[similar_clusters[i][j]].split('/')[-1].replace(IMAGE_FORMAT, '')

        clusters = {}
        for idx, cluster in enumerate(similar_clusters):
            clusters[idx] = cluster

        with open(f'{DATA_FOLDER}/{batch_id}/{CLUSTER_JSON_FILE_NAME}', 'w') as json_file:
            json.dump(clusters, json_file)

        return clusters

    except Exception as e:
        log.error(f'Error while computing clusters: [{e}]')
        return None
