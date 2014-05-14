var mongoose = require('mongoose'),
	ComponentOption = require('./app/model/ComponentOption'),
	ComponentOptionGroup = require('./app/model/ComponentOptionGroup'),
	Laptop = require('./app/model/Laptop');

mongoose.connect('mongodb://localhost/is217-final-exam');

var laptop = {
	name: 'MacBook Air',
	basePrice: 100000,
	componentOptionGroups: [
		{
			title: 'Screen Size',
			componentOptions: [
				{ name: '11-inch', price: 0},
				{ name: '15-inch', price: 20000}
			]
		},
		{
			title: 'Hard Drive Size',
			componentOptions: [
				{ name: '128 GB', price: 0},
				{ name: '256 GB', price: 20000}
			]
		},
		{
			title: 'RAM',
			componentOptions: [
				{ name: '8 GB', price: 0},
				{ name: '16 GB', price: 20000}
			]
		},
	]
};

function insertComponentOptions(componentOptions) {
	return ComponentOption.remove().exec().then(function() {
		return ComponentOption.create.apply(ComponentOption, componentOptions);
	});
}

function insertComponentOptionGroup(componentOptionGroup) {
	return insertComponentOptions(componentOptionGroup.componentOptions).then(function(componentOptions) {
		return ComponentOptionGroup.remove().exec().then(function() {
			componentOptionGroup.componentOptions = componentOptions.map(function(option) {
				return option._id;
			});
			
			return ComponentOptionGroup.create(componentOptionGroup);
		});
	});
}

/*
function insertLaptop(laptop) {
	var componentOptionGroups = [];
	
	var returnPromise = initialPromise = new Promise;
	
	laptop.componentOptionGroups.forEach(function(componentOptionGroup) {
		returnPromise = returnPromise.then(insertComponentOptionGroup(componentOptionGroup));
	});
	
	returnPromise.then(function() {
		
	})
	
	initialPromise.fulfill();
}
*/

/*
function insertComponentOptions() {
	return ComponentOption.remove().exec().then(function() {
		return ComponentOption.create.apply(ComponentOption, componentOptions);
	});
}

function insertComponentOptionGroups() {
	return ComponentOptionGroup.create.apply(ComponentOptionGroup, componentOptionGroups).then(function() {
		
	});
}

insertComponentOptions().then(function() {
	process.exit();
});
*/
