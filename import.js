var loadModels = require('./app/model');

loadModels().then(function(models) {
	insertComponentOptions(models.ComponentOption);
});

function insertComponentOptions(ComponentOption) {
	var components = [
		{ name: '11-inch', price: 0},
		{ name: '15-inch', price: 20000},
		{ name: '128 GB', price: 0},
		{ name: '256 GB', price: 20000},
		{ name: '8 GB', price: 0},
		{ name: '16 GB', price: 20000}
	];
	
	return ComponentOption.create.apply(null, components);
}