var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var OptionGroupSchema = new Schema({
	title: String,
	options: [{
		type: ObjectId,
		ref: 'Option'
	}]
});

module.exports = mongoose.model('OptionGroup', OptionGroupSchema);