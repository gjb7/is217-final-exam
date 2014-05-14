var path = require('path'),
	fs = require('fs');

module.exports = function(app, cb) {
	var controllerDir = path.join(__dirname, 'controller');
	
	fs.readdir(controllerDir, function(err, files) {
		files.forEach(function(file) {
			require(path.join(controllerDir, file))(app);
		});
		
		if (cb) {
			cb();
		}
	});
};
