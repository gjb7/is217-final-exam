var path = require('path'),
	fs = require('fs'),
	mongodb = require('mongodb'),
	koa = require('koa'),
	_ = require('koa-route'),
	serve = require('koa-static'),
	body = require('koa-body'),
	swig = require('koa-swig'),
	app = koa();

mongodb.MongoClient.connect('mongodb://localhost/is217-final-exam', function(err, db) {
	if (err) {
		throw err;
	}
	
	swig(app, {
		root: path.join(__dirname, 'app', 'views')
	});
	
	app.use(serve(path.join(__dirname, 'app', 'public')));
	app.use(body());
	
	require('./app')(app);
	
	app.listen(3000);
});
