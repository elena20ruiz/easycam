FROM python:3.7
ADD . /srv/easycam
WORKDIR /srv/easycam
RUN pip install --upgrade pip
RUN pip3 install -r requirements.lock
CMD uwsgi --ini easycam.ini