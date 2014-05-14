var path = require('path'),
	fs = require('fs'),
	koa = require('koa'),
	_ = require('koa-route'),
	serve = require('koa-static'),
	body = require('koa-body'),
	swig = require('koa-swig'),
	app = koa();

swig(app, {
	root: path.join(__dirname, 'app', 'views')
});

app.use(serve(path.join(__dirname, 'app', 'public')));
app.use(body());

require('./app')(app);

app.listen(3000);
