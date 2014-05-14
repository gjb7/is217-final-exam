module.exports = function(app) {
	app.get('/quote', function() {
		
		
		yield this.render('new-quote');
	});
};