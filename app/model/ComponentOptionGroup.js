var mongoose = require('mongoose'),
	util = require('../lib/util'),
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
	this.slug = util.toSlug(this.title);
	
	next();
});

module.exports = mongoose.model('ComponentOptionGroup', ComponentOptionGroupSchema);