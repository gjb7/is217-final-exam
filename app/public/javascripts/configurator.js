(function(global, $) {
	function Configurator(data) {
		this.data = data;
		
		this.configuratorElm = $('#configurator');
		
		this._render();
	}
	
	Configurator.prototype._render = function() {
		var self = this;
		
		this.data.componentOptionGroups.forEach(function(group) {
			var fieldset = $('<fieldset />');
			var legend = $('<legend />');
			legend.text(group.title);
			fieldset.append(legend);
			
			self.configuratorElm.append(fieldset);
		});
	}
	
	global.Configurator = Configurator;
})(this, jQuery);