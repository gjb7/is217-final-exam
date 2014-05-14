var Quote = require('../model/Quote'),
	Laptop = require('../model/Laptop'),
	ComponentOption = require('../model/ComponentOption');

module.exports = function(app) {
	app.get('/quote/new', function *() {
		var laptop = yield Laptop.findOne().populate('componentOptionGroups').exec();
		yield ComponentOption.populate(laptop, {
			path: 'componentOptionGroups.componentOptions'
		});
		
		yield this.render('new-quote', {
			laptop: laptop
		});
	});
	
	app.post('/quote/new', function *() {
		
		
/* 		this.redirect('/quote/'); */
	});
	
	app.get('/quote/([0-9a-z]+)', function *(id) {
		var quote = yield Quote.findById(id).exec();
		
		yield this.render('view-quote', {
			quote: quote
		});
	});
};