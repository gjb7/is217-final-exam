var path = require('path'),
	fs = require('fs'),
	koa = require('koa'),
	_ = require('koa-route'),
	serve = require('koa-static'),
	body = require('koa-body'),
	app = koa();

app.use(serve(path.join(__dirname, 'public')));
app.use(body());

fs.readdir(path.join(__dirname, 'app'), function(err, files) {
	
});

app.listen(3000);
