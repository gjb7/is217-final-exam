var path = require('path'),
	fs = require('fs'),
	MongoClient = require('mongodb').MongoClient,
	koa = require('koa'),
	serve = require('koa-static'),
	body = require('koa-body'),
	swig = require('koa-swig'),
	logger = require('koa-logger'),
	app = koa();

MongoClient.connect('mongodb://localhost/is217-final-exam', function(err, db) {
	if (err) {
		throw err;
	}
	
	swig(app, {
		root: path.join(__dirname, 'app', 'view'),
		ext: 'swig'
	});
	
	app.use(logger());
	app.use(serve(path.join(__dirname, 'app', 'public')));
	app.use(body());
	
	require('./app')(app, function() {
		app.listen(3000);
	});
});
