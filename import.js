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

insertLaptop(laptop, function() {
	process.exit();
});

function insertComponentOptions(componentOptions, cb) {
	componentOptions.push(cb);
	
	ComponentOption.create.apply(ComponentOption, componentOptions);
}

function insertComponentOptionGroup(componentOptionGroup, cb) {
	insertComponentOptions(componentOptionGroup.componentOptions, function(err) {
		if (err) {
			throw err;
		}
		
		var optionNames = componentOptionGroup.componentOptions.map(function(option) {
			return option.name;
		});
		
		ComponentOption.find({}).where('name').in(optionNames).exec(function(err, objects) {
			componentOptionGroup.componentOptions = objects.map(function(option) {
				return option._id;
			});
			
			ComponentOptionGroup.create(componentOptionGroup, cb);
		});
	});
}

function insertLaptop(laptop, callback) {
	var i = 0;
	
	function insertNextComponentOptionGroup(cb) {
		if (i == laptop.componentOptionGroups.length) {
			cb();
			
			return;
		}
		
		insertComponentOptionGroup(laptop.componentOptionGroups[i], function(err) {
			if (err) {
				throw err;
			}
			
			i++;
			
			insertNextComponentOptionGroup(cb);
		});
	}
	
	ComponentOption.remove().exec().then(function() {
		return ComponentOptionGroup.remove().exec();
	}).then(function() {
		return Laptop.remove().exec();
	}).then(function() {
		insertNextComponentOptionGroup(function() {
			var groupNames = laptop.componentOptionGroups.map(function(group) {
				return group.title;
			});
			
			ComponentOptionGroup.find({}).where('title').in(groupNames).exec(function(err, objects) {
				laptop.componentOptionGroups = objects.map(function(group) {
					return group._id;
				});
				
				Laptop.create(laptop, callback);
			});
		});
	});
}