var mongoose = require('mongoose'),
	utils = require('../lib/utils'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var QuoteSchema = new Schema({
	laptop: {
		type: ObjectId,
		ref: 'Laptop'
	},
	componentOptions: [{
		type: ObjectId,
		ref: 'ComponentOption'
	}]
});

QuoteSchema
	.virtual('totalPrice')
	.get(function() {
		return utils.calculateCost(this.laptop, this.componentOptions);
	});

QuoteSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Quote', QuoteSchema);