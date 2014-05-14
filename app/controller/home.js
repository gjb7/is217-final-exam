var _ = require('koa-route');

module.exports = function(app) {
	app.use(_.get('/', function *() {
		yield this.render('home');
	});
};