var path = require('path'),
	fs = require('fs'),
	mongoose = require('mongoose'),
	koa = require('koa'),
	serve = require('koa-static'),
	body = require('koa-body'),
	swig = require('koa-swig'),
	logger = require('koa-logger'),
	app = koa();

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
