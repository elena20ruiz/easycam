'use strict';


// Load the things we need
var express = require('express');
var app = express();
app.set('view engine', 'ejs');

const PORT = 8080;
const HOST = '0.0.0.0';

// Camera
const cameraCtrl = require('./src/xiaomi');

// App
app.get('/', function(req, res) {
	res.render('pages/index');
});

app.get('/connect', function(req, res) {
	res.render('pages/connect');
});

app.get('/import', function(req, res) {
	try {
		cameraCtrl
			.connect()
			.then((result)=>{
				if(result){
					var ini =''
					var fi=''
					files = cameraCtrl.getFiles(ini, fi, result)
					// Download files
					cameraCtrl.importFiles(files)
						.then((res)=>{

						})
						.catch((res)=>{

						})

					//Save

					// Render
					res.render('pages/import')
				}
			})

	} catch (error) {
		console.error('BAD ERROR')
	}
	
});

app.get('/view', function(req, res) {
	res.render('pages/view');
});

app.get('/cluster', function(req, res) {
	res.render('pages/cluster');
});

app.get('/result', function(req, res) {
	res.render('pages/result');
});

// Static
app.use(express.static(__dirname + '/public'));

// Run
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);