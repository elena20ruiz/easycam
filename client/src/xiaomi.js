
const c = require('./constants.js');

// Camera
const yi = require('yi-action-camera');


function connect(){
    return new Promise((resolve)=>{
        try {
            yi.connect()
            .then(()=>{
                console.log('Camera connected')
                yi.listFiles(c.constant.yiImagePath)
                    .then((res)=> {
                        console.log(res);
                        resolve(res)
                    })
                    .catch((res)=> {
                        console.error('ERROR' + res);
                        resolve(false);
                    })
            })
            .catch(()=>{
                console.log('Not possible to connect');
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
