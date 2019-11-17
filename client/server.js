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
			.connect(req)
			.then( (result) => {
				if (!!result) {
					res.render('pages/import');
				} else {
					res.render('pages/connect');
				}
			});

	} catch (error) {
		console.error('BAD ERROR', error);
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