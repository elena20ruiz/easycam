from src.easycam import resnet50_model
from src.helper import log
from src.services import image_service


def extract_features(images):
    try:
        features = list()
        for image_path in images:
            image_pillow = image_service.resize(image_path)
            image_input = image_service.image_to_numpy_array(image_pillow)
            if image_input is not None:
                feature_array = resnet50_model.predict(image_input)
                feature_array = feature_array[0]
                features.append(list(feature_array))
            image_pillow.close()
        return features

    except Exception as e:
        log.error(f'Error while extracting features: [{e}]')
        return []
