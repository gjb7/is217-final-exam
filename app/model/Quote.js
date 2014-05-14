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
		var totalPrice = this.laptop.basePrice;
		
		this.componentOptions.forEach(function(option) {
			totalPrice += option.price;
		});
		
		return totalPrice;
	});

QuoteSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Quote', QuoteSchema);