(function($) {
	var plugin = $['ui']['autocomplete'].prototype;
	
	// store copies of the original plugin functions before overwriting
	var functions = {};
	for (var i in plugin) {
		if (typeof(plugin[i]) === 'function') {
			functions[i] = plugin[i];
		}
	}
	
	// extend existing functionality of the autocomplete plugin
	$.extend(true, plugin, {
		_create: function() {
			var self = this,
				doc = this.element[ 0 ].ownerDocument;
			
			functions['_create'].call(this);
			
			this.hintText = this.element.data('hint');
			this.searchText = this.element.data('searching');
			
			// set up the hint object
			this.hint = $("<div></div>")
				.addClass("ui-autocomplete-hint")
				.appendTo($(this.options.appendTo || "body", doc)[0]);
			
			// show/hide hint text on focus/blur
			this.element
				.bind("focus.autocomplete", function(event) {
					self._showHint(self.hintText);
				})
				.bind("blur.autocomplete", function(event) {
					self._hideHint();
				});
		},
		
		destroy: function() {
			this.hint.remove();
			functions["destroy"].call(this);
		},
		
		_search: function( value ) {
			this._hideHint();
			this._showHint(this.searchText);
			functions["_search"].call(this, value);
		},
		
		_response: function( content ) {
			this._hideHint();
			functions["_response"].call(this, content);
		},
		
		_showHint: function(text) {
			var text = $.trim(text);
			
			if (text !== '') {
				this.hint.text(text).show();
				this._resizeHint();
			}
		},
		
		_hideHint: function() {
			this.hint.hide();
		},
		
		_resizeHint: function() {
			this.hint
				// .outerWidth(Math.max(
				// 	this.hint.width("").outerWidth(),
				// 	this.element.outerWidth()
				// ))
				.outerWidth(this.element.outerWidth())
				.position($.extend({
					of: this.element
				}, this.options.position));
		}
	});
})(jQuery);