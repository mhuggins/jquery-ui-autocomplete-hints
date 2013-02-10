(function($) {
	var plugin = $.ui.autocomplete.prototype;
	
	// store copies of the original plugin functions before overwriting
	var functions = {};
	for (var i in plugin) {
		if (typeof(plugin[i]) === 'function') {
			functions[i] = plugin[i];
		}
	}
	
	// extend existing functionality of the autocomplete plugin
	$.extend(true, plugin, {
		_create: function () {
			var self = this,
					doc = this.element[0].ownerDocument;
			
			functions._create.apply(this, arguments);
			
			this.hintText = this.element.data('hint');
			this.searchText = this.element.data('searching');
			
			// set up the hint object
			this.hint = $('<div></div>')
				.addClass('ui-autocomplete-hint')
				.appendTo($(this.options.appendTo || 'body', doc)[0]);
			
			// show/hide hint text on focus/blur
			this.element
				.bind('focus.autocomplete', function () {
					self._showHint(self.hintText);
				})
				.bind('blur.autocomplete', function () {
					self._hideHint();
				});
		},
		
		_destroy: function () {
			this.hint.remove();
			return functions._destroy.apply(this, arguments);
		},
		
		_search: function () {
			this._showHint(this.searchText);
			return functions._search.apply(this, arguments);
		},
		
		_response: function () {
			this._hideHint();
			return functions._response.apply(this, arguments);
		},
		
		_showHint: function (text) {
			text = $.trim(text);
			
			if (text !== '') {
				this.hint.text(text).show();
				this._resizeHint();
			}
		},
		
		_hideHint: function () {
			this.hint.hide();
		},
		
		_resizeHint: function () {
			this.hint
				.outerWidth(this.element.outerWidth())
				.position($.extend({ of: this.element }, this.options.position));
		}
	});
})(jQuery);
