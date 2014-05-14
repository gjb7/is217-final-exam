var Quote = require('../model/Quote');

module.exports = function(app) {
	app.get('/', function *() {
		var quotes = yield Quote.find({}).exec();
		
		yield this.render('home', {
			quotes: quotes
		});
	});
};