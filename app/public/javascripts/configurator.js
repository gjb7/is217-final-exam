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
		var fieldset = $('<fieldset />');
		var legend = $('<legend />');
		legend.text(group.title);
		fieldset.append(legend);
		
		return fieldset;
	}
	
	global.Configurator = Configurator;
})(this, jQuery);