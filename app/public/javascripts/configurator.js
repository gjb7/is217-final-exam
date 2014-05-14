(function(global, $) {
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
			self._updateTotal();
		})
		
		label.append(input);
		label.append(option.name);
		
		return radioDiv;
	}
	
	Configurator.prototype._updateTotal = function() {
		var total = this.laptop.basePrice;
		var self = this;
		
		$('.componentOption:checked').each(function() {
			var name = $(this).attr('value');
			var option = self.componentOptions[name];
			total += option.price;
		});
		
		this.priceDisplayElm.text(total);
	}
	
	global.Configurator = Configurator;
})(this, jQuery);