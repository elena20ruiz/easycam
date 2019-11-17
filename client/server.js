'use strict';

// Load the things we need
var express = require('express');
var app = express();
app.set('view engine', 'ejs');

const PORT = 8080;
const HOST = '0.0.0.0';

// App
app.get('/', function(req, res) {
	res.render('pages/index');
});

app.get('/connect', function(req, res) {
	res.render('pages/connect');
});

app.get('/import', function(req, res) {
	res.render('pages/import');
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