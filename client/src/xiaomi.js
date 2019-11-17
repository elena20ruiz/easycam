
const c = require('./constants.js');
const yi = require('yi-action-camera');


function connect(){
    return new Promise((resolve)=>{
        try {
            yi.connect()
            .then(()=>{
                console.log('Camera connected!')
                yi.listFiles(c.constant.yiImagePath)
                    .then((res)=> {
                        console.log('Files listed!');
                        var images = []
                        fromDate = Date.parse('2019-11-15 21:25:24');
                        toDate = Date.parse('2019-11-17 21:25:24');
                        for (var i = 0; i < res.length; ++i) {
                            imageDictionary = res[i]
                            imageName = Object.keys(imageDictionary)[0];
                            imageDate = Date.parse(imageDictionary[imageName]);
                            if (imageDate >= fromDate && imageDate <= toDate) {
                                images.push(imageName);
                            }
                        }
                        console.log(images.length, 'images!');
                        resolve(res)
                    })
                    .catch((res)=> {
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

function importFiles(elements){
    return new Promise((resolve) => {
        var images = []
        for(var i in elements){
            yi.downloadFile(c.constant.yiImagePath + elements[i], '' )
        }
    })
}

function getFiles(ini, fi, elements) {
    var result = []
    for(var i in elements) {
        var photoDate = elements[i].split(' ');
        result.push(i);
    }
    return result;
}



module.exports.connect = connect;
