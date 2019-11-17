const fs = require('fs');
const request = require('request');

const c = require('./constants.js');
const yi = require('yi-action-camera');


function delay(t, v) {
  return new Promise(function(resolve) {
      setTimeout(resolve.bind(null, v), t)
  });
}


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


function connect(formReq){
    return new Promise((resolve)=>{
        try {
            yi.connect()
            .then(()=>{
                console.log('Camera connected!')
                yi.listFiles(c.constant.yiImagePath)
                    .then((res)=> {
                        console.log('Files listed!');
                        var images = [];
                        var downloadedImages = [];
                        fromDateTimeDate = formReq.query.initialTimeDate;
                        fromDateTimeHour = formReq.query.initialTimeHour;
                        toDateTimeDate = formReq.query.finalTimeDate;
                        toDateTimeHour = formReq.query.finalTimeHour;
                        if (!fromDateTimeDate || !fromDateTimeHour || !toDateTimeDate || !toDateTimeHour) {
                            alert('You have to fill all the parameters!');
                            resolve(false);
                        }
                        fromDate = Date.parse(fromDateTimeDate + ' ' + fromDateTimeHour);
                        toDate = Date.parse(toDateTimeDate + ' ' + toDateTimeHour);
                        for (var i = 0; i < res.length; ++i) {
                            imageDictionary = res[i];
                            imageName = Object.keys(imageDictionary)[0];
                            imageDate = Date.parse(imageDictionary[imageName]);
                            if (imageDate >= fromDate && imageDate <= toDate) {
                                images.push(c.constant.yiImagePath + imageName);
                                downloadedImages.push(c.constant.imageOutputFolder + imageName);
                            }
                        }
                        console.log(images.length, 'images!');
                        console.log(images);
                        for (var i = 0; i < images.length; ++i) {
                            yi.downloadFile(images[i], 'public' + c.constant.imageOutputFolder)
                                .then((fileDownloaded) => {
                                    console.log('Downloaded', fileDownloaded);
                                })
                                .catch((res) => {
                                    console.error('Error downloading image', res);
                                });
                        }
                        return delay(5000 * images.length).then(function() {
                            resolve(downloadedImages);
                        });
                    })
                    .catch((res) => {
                        console.error('Error listing files:', res);
                        resolve(false);
                    })
            })
            .catch(()=>{
                console.log('Not possible to connect!');
                resolve(false);
            }) 
        } catch (error) {
            console.log('Timeout - Not possible to connect');
            resolve(false);
        }
    })
}


function cluster() {
    return new Promise((resolve)=>{
        try {
            const batchId = uuidv4();
            console.log('Batch ID', batchId);
            var files = fs.readdirSync('public' + c.constant.imageOutputFolder);
            for (var i = 0; i < files.length; ++i) {
                if (files[i].includes('.jpg')) {
                    var fileDownloaded = 'public' + c.constant.imageOutputFolder + files[i];
                    var bitmap = fs.readFileSync(fileDownloaded);
                    var imageBase64 = new Buffer(bitmap).toString('base64');
                    console.log(files[i], 'Converted to imageBase64!');
                    options = {
                        method: 'POST',
                        uri: c.constant.apiURL + '/image/download',
                        headers : {
                            'Content-Type':'application/json'
                        },
                        json: {
                            'batch_id': batchId,
                            'image_id': files[i].replace('.jpg', ''),
                            'image_base64': imageBase64
                        }
                    }
                    request(options, function (error, response, body) {
                        if (error) {
                            console.error('Error sending to API', error.message);
                        }
                        else {
                            console.log(body);
                            if (body.error) {
                                console.error('Error sending to API', body.message);
                            } else {
                                console.log('Done', body.response.message);
                            }
                        }
                    });
                }
            }
            return delay(3000 * files.length).then(function() {
                resolve(true);
            });
        } catch (error) {
            console.log('Timeout - Not possible to cluster', error);
            resolve(false);
        }
    })
}

module.exports.connect = connect;
module.exports.cluster = cluster;
