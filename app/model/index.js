var path = require('path'),
	fs = require('fs'),
	Promise = require('promise');

module.exports = function() {
	return new Promise(function(fulfill, reject) {
		var modelDir = __dirname;
		
		fs.readdir(modelDir, function(err, files) {
			if (err) {
				reject(err);
			}
			else {
				var models = {};
				
				files.map(function(file) {
					var modelName = path.basename(file, path.extname(path));
					models[modelName] = require(path.join(modelDir, file));
				});
				
				fulfill(models);
			}
		});
	});
}