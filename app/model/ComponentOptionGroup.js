var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var ComponentOptionGroupSchema = new Schema({
	title: String,
	slug: String,
	componentOptions: [{
		type: ObjectId,
		ref: 'ComponentOption'
	}]
});

ComponentOptionGroupSchema.pre('save', function(next) {
	this.slug = title.toLowerCase().replace(/[ _]/g, '-').replace(/[^0-9a-z\-]/g, '');
});

module.exports = mongoose.model('ComponentOptionGroup', ComponentOptionGroupSchema);