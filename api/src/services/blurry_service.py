import cv2

from src import *


def get_best_image(batch_id, cluster_list):
    if len(cluster_list) == 0:
        return None
    elif len(cluster_list) == 1:
        return cluster_list[0]
    else:
        best_image = None
        best_punctuation = 0.0
        for image_id in cluster_list:
            image_path = f'{DATA_FOLDER}/{batch_id}/{image_id}{IMAGE_FORMAT}'
            image = cv2.imread(image_path)
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            fm = cv2.Laplacian(gray, cv2.CV_64F).var()
            if fm > best_punctuation:
                best_image = image_id
                best_punctuation = fm
        return best_image
