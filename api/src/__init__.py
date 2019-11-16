DATA_FOLDER = 'data'

IMAGE_SIZE = (224, 224)
IMAGE_CHANNELS = 3
IMAGE_FORMAT = '.jpg'

INDEX_FILE_NAME = 'index.nmslib'
DISTANCE_THRESHOLD = 0.35

CLUSTER_JSON_FILE_NAME = 'cluster.json'

MESSAGE_OK = 'OK'
MESSAGE_ERROR = 'Unexpected error while processing the API'
MESSAGE_ERROR_PARAMETERS = 'Not all input parameters were correctly specified.'
MESSAGE_ERROR_DOWNLOAD = 'The provided image was not correctly specified.'
MESSAGE_ERROR_BATCH = 'Given batch does not exist.'
MESSAGE_ERROR_BATCH_IMAGES = 'No images found in the given batch.'
MESSAGE_ERROR_FEATURES = 'Not all features could be obtained.'
MESSAGE_ERROR_INDEX = 'Index could not be built.'
MESSAGE_ERROR_CLUSTER = 'Clusters could not be formed'


__all__ = [
    'DATA_FOLDER',
    'IMAGE_SIZE',
    'IMAGE_CHANNELS',
    'IMAGE_FORMAT',
    'INDEX_FILE_NAME',
    'DISTANCE_THRESHOLD',
    'CLUSTER_JSON_FILE_NAME',
    'MESSAGE_OK',
    'MESSAGE_ERROR',
    'MESSAGE_ERROR_PARAMETERS',
    'MESSAGE_ERROR_DOWNLOAD',
    'MESSAGE_ERROR_BATCH',
    'MESSAGE_ERROR_BATCH_IMAGES',
    'MESSAGE_ERROR_FEATURES',
    'MESSAGE_ERROR_INDEX',
    'MESSAGE_ERROR_CLUSTER'
]
