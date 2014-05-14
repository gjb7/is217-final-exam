var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var QuoteSchema = new Schema({
	laptop: {
		type: ObjectId,
		ref: 'Laptop'
	},
	options: [{
		type: ObjectId,
		ref: 'Option'
	}]
});

module.exports = mongoose.model('Quote', QuoteSchema);