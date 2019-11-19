
const yiImagePath = '/tmp/fuse_d/DCIM/153MEDIA/';
const imageOutputFolder = '/img/batch/';

const DEVICES = {
    xiaomi: 'Xiaomi Yi Action',
    yeti: 'Yeti Nano Microphone'
}

const apiURL = 'https://api.easycam.asuarez.dev'


module.exports.constant = {
    yiImagePath: yiImagePath,
    imageOutputFolder: imageOutputFolder,
    DEVICES: DEVICES,
    apiURL: apiURL
}
