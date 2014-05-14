var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var LaptopSchema = new Schema({
	name: String,
	basePrice: Number,
	componentOptionGroups: [{
		type: ObjectId,
		ref: 'ComponentOptionGroup'
	}]
});

module.exports = mongoose.model('Laptop', LaptopSchema);