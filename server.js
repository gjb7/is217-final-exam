var path = require('path'),
	fs = require('fs'),
	mongoose = require('mongoose'),
	koa = require('koa'),
	serve = require('koa-static'),
	body = require('koa-body'),
	logger = require('koa-logger'),
	views = require('koa-views'),
	router = require('koa-router'),
	app = koa();

mongoose.connect('mongodb://localhost/is217-final-exam');

app.use(views(path.join(__dirname, 'app', 'view'), {
	default: 'jade'
}));

app.use(logger());
app.use(serve(path.join(__dirname, 'app', 'public')));
app.use(body());
app.use(router(app));

require('./app')(app).done(function() {
	app.listen(3000);
	
	console.log('Server listening on 0.0.0.0:3000.');
}, function(err) { throw err; });
