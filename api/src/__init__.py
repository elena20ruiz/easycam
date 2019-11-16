DATA_FOLDER = 'data'

IMAGE_SIZE = (224, 224)
IMAGE_CHANNELS = 3

MESSAGE_OK = 'OK'
MESSAGE_ERROR = 'Unexpected error while processing the API'
MESSAGE_ERROR_PARAMETERS = 'Not all input parameters were correctly specified.'
MESSAGE_ERROR_DOWNLOAD = 'The provided image was not correctly specified.'
MESSAGE_ERROR_BATCH = 'Given batch does not exist.'
MESSAGE_ERROR_BATCH_IMAGES = 'No images found in the given batch.'
MESSAGE_ERROR_FEATURES = 'Not all features could be obtained.'


__all__ = [
    'DATA_FOLDER',
    'IMAGE_SIZE',
    'IMAGE_CHANNELS',
    'MESSAGE_OK',
    'MESSAGE_ERROR',
    'MESSAGE_ERROR_PARAMETERS',
    'MESSAGE_ERROR_DOWNLOAD',
    'MESSAGE_ERROR_BATCH',
    'MESSAGE_ERROR_BATCH_IMAGES',
    'MESSAGE_ERROR_FEATURES'
]
