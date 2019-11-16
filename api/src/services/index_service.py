from src import *
from src.helper import log
from src.services import image_service
from src.services.nmslib_service import Nmslib


def build(features, batch_id):
    try:
        features_numpy_array = image_service.list_to_numpy_array(features)
        index_path = f'{DATA_FOLDER}/{batch_id}/{INDEX_FILE_NAME}'
        index = Nmslib()
        index.fit(features_numpy_array)
        index.save(index_path)
        return index_path

    except Exception as e:
        log.error(f'Error while building index: [{e}]')
        return []
