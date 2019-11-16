import connexion

from keras.applications.inception_v3 import InceptionV3
from flask_cors import CORS


resnet50_model = InceptionV3(include_top=False, pooling='avg', weights='imagenet')

connexion_app = connexion.FlaskApp(__name__, specification_dir='./openapi/')
flask_app = connexion_app.app
flask_app.config['JSON_AS_ASCII'] = False
connexion_app.add_api('openapi.yaml', arguments={'title': 'EasyCam API'})
CORS(flask_app)


@flask_app.route('/')
def alive_check():
    return 'Welcome to EasyCam API!', 200
