var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var ComponentOptionGroupSchema = new Schema({
	title: String,
	componentOptions: [{
		type: ObjectId,
		ref: 'ComponentOption'
	}]
});

module.exports = mongoose.model('ComponentOptionGroup', ComponentOptionGroupSchema);