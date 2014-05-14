var Quote = require('../model/Quote');

module.exports = function(app) {
	app.get('/', function *() {
		var quotes = yield Quote.find({}).populate('laptop componentOptions').exec();
		
		yield this.render('home', {
			quotes: quotes
		});
	});
};