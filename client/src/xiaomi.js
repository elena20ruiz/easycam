const fs = require('fs')

const c = require('./constants.js');
const yi = require('yi-action-camera');


function delay(t, v) {
  return new Promise(function(resolve) {
      setTimeout(resolve.bind(null, v), t)
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
                            }
                        }
                        console.log(images.length, 'images!');
                        console.log(images);
                        for (var i = 0; i < images.length; ++i) {
                            yi.downloadFile(images[i], c.constant.imageOutputFolder)
                                .then((fileDownloaded) => {
                                    console.log(i, 'Downloaded', fileDownloaded);
                                    var bitmap = fs.readFileSync(fileDownloaded);
                                    var imageBase64 = new Buffer(bitmap).toString('base64');
                                    console.log(i, 'Converted to imageBase64!');
                                })
                                .catch((res) => {
                                    console.error('Error downloading image', res);
                                });
                        }
                        return delay(3000 * images.length).then(function() {
                            resolve(res);
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


module.exports.connect = connect;
