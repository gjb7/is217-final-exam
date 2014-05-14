var path = require('path'),
	fs = require('fs'),
	Promise = require('promise');

module.exports = function(app) {
	return loadControllers(app).then(loadModels);
};

function loadControllers(app) {
	return new Promise(function(fulfill, reject) {
		var controllerDir = path.join(__dirname, 'controller');
		
		fs.readdir(controllerDir, function(err, files) {
			if (err) {
				reject(err);
			}
			else {
				files.forEach(function(file) {
					require(path.join(controllerDir, file))(app);
				});
				
				fulfill();
			}
		});
	});
}

function loadModels() {
	return new Promise(function(fulfill, reject) {
		fulfill();
	});
}
