(function(global, $) {
	function Configurator(data) {
		this.data = data;
		
		this.configuratorElm = $('#configurator');
		
		this._render();
	}
	
	Configurator.prototype._render = function() {
		var self = this;
		
		this.data.componentOptionGroups.forEach(function(group) {
			var fieldset = self._renderComponentOptionGroup(group);
			
			self.configuratorElm.append(fieldset);
		});
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
			value: option._id
		});
		
		label.append(input);
		label.append(option.name);
		
		return radioDiv;
	}
	
	global.Configurator = Configurator;
})(this, jQuery);