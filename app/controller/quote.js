var Quote = require('../model/Quote'),
	Laptop = require('../model/Laptop'),
	ComponentOption = require('../model/ComponentOption');

module.exports = function(app) {
	app.get('/quote/new', function *() {
		var laptop = yield Laptop.findOne().populate('componentOptionGroups').exec();
		laptop = laptop.toObject();
		
		for (var i = 0; i < laptop.componentOptionGroups.length; i++) {
			var options = yield ComponentOption.find({ _id: { $in: laptop.componentOptionGroups[i].componentOptions }}).exec();
			laptop.componentOptionGroups[i].componentOptions = options;
		}
		
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