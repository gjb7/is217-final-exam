module.exports = function(app) {
	app.get('/quote', function *() {
		
		
		yield this.render('view-quote');
	});
	
	app.get('/quote/new', function *() {
		yield this.render('new-quote');
	});
	
	app.post('/quote', function *() {
		
	});
};