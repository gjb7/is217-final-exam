var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ComponentOptionSchema = new Schema({
	name: String,
	price: Number
});

module.exports = mongoose.model('ComponentOption', ComponentOptionSchema);