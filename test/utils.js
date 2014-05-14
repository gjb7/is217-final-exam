var mocha = require('mocha'),
	chai = require('chai'),
	expect = chai.expect,
	utils = require('../app/lib/utils');

describe('utils', function() {
	describe('#calculateCost', function() {
		var laptop = {
			name: 'Laptop',
			basePrice: 1000
		};
		
		var componentOptions = [
			{
				name: '16GB',
				price: 200
			},
			{
				name: '128GB',
				price: 0
			},
			{
				name: '15-inch',
				price: 200
			}
		];
		
		it('should calculate the cost of a laptop with components', function() {
			expect(utils.calculateCost(laptop, componentOptions)).to.equal(1400);
		});
	});
});