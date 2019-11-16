from flask import request

from src import *
from src.helper import response, log
from src.helper.timer import Timer


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

        return response.make(error=False, response=MESSAGE_OK)

    except Exception as e:
        log.error(f'Exception while processing {download.__name__} function: [{e}]')
        log.exception(e)
        return response.make(error=True, message=MESSAGE_ERROR)


def cluster(batch_id):
    return 'OK'


def clean(cluster_id):
    return 'OK'
