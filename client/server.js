'use strict';


// Load the things we need
var express = require('express');
var app = express();
app.set('view engine', 'ejs');

const PORT = 8080;
const HOST = '0.0.0.0';

// Camera
const cameraCtrl = require('./src/xiaomi');
const c = require('./src/constants');


// App
app.get('/', function(req, res) {
	res.render('pages/index');
});

app.get('/connect', function(req, res) {

	var device = req.query.device;
	if(device == c.constant.DEVICES.xiaomi){
		res.render('pages/connect', {error: false});
	}
	else{
		res.redirect('/');
	}
});

app.get('/import', function(req, res) {
	try {
		cameraCtrl
			.connect(req)
			.then( (result) => {
				if (!!result) {
					res.render('pages/import', {data: result, error: false});
				} else {
					res.render('pages/connect', {error: true});
				}
			});

	} catch (error) {
		console.error('BAD ERROR', error);
	}
});

app.get('/cluster', function(req, res) {

	try {
		cameraCtrl
			.cluster()
			.then( (result) => {
				if (!!result) {
					res.render('pages/cluster', {data: result['cluster'], batchId: result.batchId});
				} else {
					res.render('pages/connect', {error: true});
				}
			});
	} catch (error) {
		console.error('BAD ERROR', error);
	}
});

app.get('/view', function(req, res) {
	try {
		cameraCtrl
			.clean(req.query.batchId, req.query.clusterId)
			.then( (result) => {
				if (!!result) {
					res.render('pages/view', {data: result});
				} else {
					res.render('pages/connect', {error: false});
				}
			});
	} catch (error) {
		console.error('BAD ERROR', error);
	}
});

// Static
app.use(express.static(__dirname + '/public'));

// Run
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);