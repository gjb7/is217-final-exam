var mocha = require('mocha'),
	chai = require('chai'),
	expect = chai.expect,
	utils = require('../app/lib/utils');

describe('utils', function() {
	describe('#calculateCost', function() {
		var laptop = {
			basePrice: 1000
		};
		
		var componentOptions = [
			{
				price: 200
			},
			{
				price: 0
			},
			{
				price: 200
			}
		];
		
		it('should calculate the cost of a laptop with components', function() {
			expect(utils.calculateCost(laptop, componentOptions)).to.equal(1400);
		});
	});
});