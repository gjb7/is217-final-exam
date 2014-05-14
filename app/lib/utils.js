function calculateCost(laptop, componentOptions) {
	var totalPrice = laptop.basePrice;
		
	componentOptions.forEach(function(option) {
		totalPrice += option.price;
	});
	
	return totalPrice;
};

module.exports.calculateCost = calculateCost;