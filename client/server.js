
// Camera
const yi = require('yi-action-camera');
// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('pages/index');
});

app.get('/connect', function(req, res) {

	res.render('pages/connect');
});

app.get('/import', function(req, res) {
	try {
		yi.connect()
			.then((res) => {

			})
			
	} catch (error) {
		
	}
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

// static
app.use(express.static(__dirname + '/public'));

// run
app.listen(8080);
console.log('8080 is the magic port');