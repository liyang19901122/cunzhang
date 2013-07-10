var carcorp = function() {

	/* 这里声明私有变量和方法 */
	var _this = this;
	/* 公有变量和方法（可以访问私有变量和方法） */

	var jcrop_api,
		boundx,
		boundy,
		// Grab some information about the preview pane
		$preview = $('#preview-pane'),
		$pcnt = $('#preview-pane .preview-container'),
		$pimg = $('#preview-pane .preview-container img'),
		xsize = $pcnt.width(),
		ysize = $pcnt.height();
	return {
		init: function() {
			_this = this;
			_this.initCapture();
		},

		//set car corp capture
		initCapture: function() {
			// Create variables (in this scope) to hold the API and image size
			$('#target').Jcrop({
				onChange: _this.updatePreview,
				onSelect: _this.updatePreview,
				onRelease: _this.clearCoords
				//aspectRatio: xsize / ysize
			}, function() {
				// Use the API to get the real image size
				var bounds = this.getBounds();
				boundx = bounds[0];
				boundy = bounds[1];
				// Store the API in the jcrop_api variable
				jcrop_api = this;

				// Move the preview into the jcrop container for css positioning
				$preview.appendTo(jcrop_api.ui.holder);
			});
			$('#coords').on('change', 'input', function(e) {
				var x1 = $('#x1').val(),
					x2 = $('#x2').val(),
					y1 = $('#y1').val(),
					y2 = $('#y2').val();
				jcrop_api.setSelect([x1, y1, x2, y2]);
			});
		},

		updatePreview: function(c) {
			_this.showCoords(c);
			if (parseInt(c.w) > 0) {
				var rx = xsize / c.w;
				var ry = ysize / c.h;

				$pimg.css({
					width: Math.round(rx * boundx) + 'px',
					height: Math.round(ry * boundy) + 'px',
					marginLeft: '-' + Math.round(rx * c.x) + 'px',
					marginTop: '-' + Math.round(ry * c.y) + 'px'
				});
			}
		},
		// Simple event handler, called from onChange and onSelect
		// event handlers, as per the Jcrop invocation above
		showCoords: function(c) {
			$('#x1').val(c.x);
			$('#y1').val(c.y);
			$('#x2').val(c.x2);
			$('#y2').val(c.y2);
			$('#w').val(c.w);
			$('#h').val(c.h);
		},

		clearCoords: function() {
			$('#coords input').val('');
		},

		publicVar: 'public var'
	};
};