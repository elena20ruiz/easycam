import base64
import os
import cv2
import numpy as np

from PIL import Image

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
        with Image.open(output_path).convert('RGB') as img:
            img = img.resize(size=IMAGE_SIZE, resample=Image.LANCZOS)
            img.save(output_path, format='JPEG', quality=95)
        return output_path

    except Exception as e:
        log.error(f'Error while downloading image {image_id}: [{e}]')
        return None


def encode(image_path):
    try:
        with open(image_path, 'rb') as img:
            image_encoded = base64.b64encode(img.read()).decode('utf-8')
        return image_encoded

    except Exception as e:
        log.error(f'Error while encoding image {image_path} to base64: [{e}]')
        return None


def image_to_numpy_array(image_path):
    try:
        numpy_image = cv2.imread(image_path)
        numpy_image = np.expand_dims(numpy_image, axis=0)
        return numpy_image

    except Exception as e:
        log.error(f'Error while converting image {image_path} to numpy array: [{e}]')
        return None


def list_to_numpy_array(list_object):
    paragraphs_vector = np.array(list_object)
    return paragraphs_vector
