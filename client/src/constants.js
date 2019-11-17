
const yiImagePath = '/tmp/fuse_d/DCIM/153MEDIA/';
const imageOutputFolder = 'public/img/batch';

const DEVICES = {
    xiaomi: 'Xiaomi Yi Action',
    yeti: 'Yeti Nano Microphone'
}

const apiURL = 'http://134.209.244.212:8087'


module.exports.constant = {
    yiImagePath: yiImagePath,
    imageOutputFolder: imageOutputFolder,
    DEVICES: DEVICES,
    apiURL: apiURL
}
