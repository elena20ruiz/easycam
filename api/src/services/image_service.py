import base64
import os

from src import *
from src.helper import log


def download(batch_id, image_id, image_base64):
    try:
        # Create folder for batch
        batch_folder = f'{DATA_FOLDER}/{batch_id}'
        if not os.path.exists(batch_folder):
            try:
                os.makedirs(batch_folder)
            except Exception as e:
                log.warn(f'Error while creating {batch_folder} folder: [{e}]')
                pass  # For avoiding errors when more than one thread are trying to create it

        image_data = base64.b64decode(image_base64)
        output_path = f'{batch_folder}/{image_id}.jpg'
        with open(output_path, 'wb') as f:
            f.write(image_data)
        return output_path

    except Exception as e:
        log.error(f'Error while downloading image {image_id}: [{e}]')
        return None
