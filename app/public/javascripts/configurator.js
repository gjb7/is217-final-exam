(function(global, $, accounting) {
	function Configurator(data) {
		this.laptop = data;
		this.componentOptions = {};
		
		this.configuratorElm = $('#configurator');
		this.priceDisplayElm = $('#price');
		
		this._extractComponentOptions();
		this._render();
	}
	
	Configurator.prototype._extractComponentOptions = function() {
		var componentOptions = {};
		
		this.laptop.componentOptionGroups.forEach(function(group) {
			group.componentOptions.forEach(function(option) {
				componentOptions[option._id] = option;
			});
		});
		
		this.componentOptions = componentOptions;
	}
	
	Configurator.prototype._render = function() {
		var self = this;
		
		this.laptop.componentOptionGroups.forEach(function(group) {
			var fieldset = self._renderComponentOptionGroup(group);
			
			self.configuratorElm.append(fieldset);
		});
		
		this._selectIncludedOptions();
		
		this._updateTotal();
	}
	
	Configurator.prototype._renderComponentOptionGroup = function(group) {
		var fieldset = $('<fieldset />'),
			legend = $('<legend />');
		
		legend.text(group.title);
		fieldset.append(legend);
		
		var self = this;
		
		group.componentOptions.forEach(function(option) {
			var optionElm = self._renderComponentOption(group, option);
			
			fieldset.append(optionElm);
		})
		
		return fieldset;
	}
	
	Configurator.prototype._formattedPriceString = function(price) {
		var sign = (price < 0) ? '-' : '+';
		price = Math.abs(price);
		
		var formattedPrice = sign + accounting.formatMoney(price);
		
		return '[' + formattedPrice + ']';
	}
	
	Configurator.prototype._renderComponentOption = function(group, option) {
		var radioDiv = $('<div />');
		radioDiv.addClass('radio');
		
		var label = $('<label />');
		radioDiv.append(label);
		
		var input = $('<input />');
		
		input.attr({
			type: 'radio',
			name: group._id,
			value: option._id,
		});
		input.addClass('componentOption');
		
		var self = this;
		input.click(function() {
			self._updatePricing($(this));
			self._updateTotal();
		})
		
		label.append(input);
		
		var nameSpan = $('<span />');
		nameSpan.append(option.name);
		
		label.append(nameSpan);
		label.append(' ');
		
		var priceSmall = $('<small />');
		priceSmall.addClass('option-price');
		priceSmall.attr('rel', option._id);
		
		if (option.price != 0) {
			priceSmall.text(this._formattedPriceString(option.price));
		}
		
		label.append(priceSmall);
		
		return radioDiv;
	}
	
	Configurator.prototype._selectIncludedOptions = function() {
		this.laptop.componentOptionGroups.forEach(function(group) {
			for(var i = 0; i < group.componentOptions.length; i++) {
				var option = group.componentOptions[i];
				
				if (option.price == 0) {
					$('input[value="' + option._id + '"]').attr('checked', true);
				}
			}
		});
	}
	
	Configurator.prototype._updatePricing = function(elm) {
		var groupID = elm.attr('name');
		var optionID = elm.attr('value');
		
		var selectedOption = this.componentOptions[optionID];
		var self = this;
		
		var radioElements = Array.prototype.slice.call(document.getElementsByName(groupID));
		radioElements.forEach(function(element) {
			var option = self.componentOptions[$(element).attr('value')];
			var priceSmall = $('small[rel="' + option._id + '"]');
			
			if (option._id == optionID) {
				priceSmall.text('');
			}
			else {
				var priceDifference = option.price - selectedOption.price;
				priceSmall.text(self._formattedPriceString(priceDifference));
			}
		});
	}
	
	Configurator.prototype._updateTotal = function() {
		var total = this.laptop.basePrice;
		var self = this;
		
		$('.componentOption:checked').each(function() {
			var name = $(this).attr('value');
			var option = self.componentOptions[name];
			total += option.price;
		});
		
		this.priceDisplayElm.text(accounting.formatMoney(total));
	}
	
	global.Configurator = Configurator;
})(this, jQuery, accounting);