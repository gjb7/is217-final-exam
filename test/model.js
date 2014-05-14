var mocha = require('mocha'),
	chai = require('chai'),
	expect = chai.expect,
	mongoose = require('mongoose'),
	mockgoose = require('mockgoose'),
	Laptop = require('../app/model/Laptop'),
	ComponentOption = require('../app/model/ComponentOption'),
	Quote = require('../app/model/Quote');

mockgoose(mongoose);

mongoose.connect('mongodb://localhost/test');

describe('Quote', function() {
	describe('#totalCost', function() {
		it('should calculate correctly', function() {
			var quote = new Quote;
			
			quote.laptop = new Laptop;
			quote.laptop.basePrice = 1000;
			
			var option = new ComponentOption;
			option.price = 200;
			quote.componentOptions.push(option);
			
			option = new ComponentOption;
			option.price = 100;
			quote.componentOptions.push(option);
			
			option = new ComponentOption;
			option.price = 0;
			quote.componentOptions.push(option);
			
			expect(quote.get('totalPrice')).to.equal(1300);
		});
	});
});