var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var LaptopSchema = new Schema({
	name: String,
	basePrice: Number,
	optionGroups: [{
		type: ObjectId,
		ref: 'OptionGroup'
	}]
});

module.exports = mongoose.model('Laptop', LaptopSchema);