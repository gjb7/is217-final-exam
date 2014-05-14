var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ComponentOptionSchema = new Schema({
	name: String,
	slug: String,
	price: Number
});

ComponentOptionSchema.pre('save', function(next) {
	this.slug = util.toSlug(this.name);
	
	next();
});

module.exports = mongoose.model('ComponentOption', ComponentOptionSchema);