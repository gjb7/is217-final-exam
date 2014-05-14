var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var OptionSchema = new Schema({
	name: String,
	price: Number
});

module.exports = mongoose.model('Option', OptionSchema);