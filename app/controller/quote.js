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
		var laptop = yield Laptop.findOne().exec();
		var options = [];
		
		for (var key in this.request.body) {
			options.push(this.request.body[key]);
		}
		
		yield Quote.create({
			laptop: laptop,
			componentOptions: options
		});
		
		this.redirect('/quote');
	});
	
	app.get('/quote/:id', function *(id) {
		var quote = yield Quote.findById(this.params.id).populate('laptop componentOptions').exec();
		
		yield this.render('view-quote', {
			quote: quote
		});
	});
};