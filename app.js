var path = require('path'),
	fs = require('fs'),
	koa = require('koa'),
	_ = require('koa-route'),
	serve = require('koa-static'),
	body = require('koa-body'),
	app = koa();

app.use(serve(path.join(__dirname, 'public')));
app.use(body());

var appDir = path.join(__dirname, 'app');

fs.readdir(appDir, function(err, files) {
	files.forEach(function(file) {
		require(path.join(appDir, file))(app);
	});
});

app.listen(3000);
