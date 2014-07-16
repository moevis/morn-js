'use strict';

(function($) {
	/*
		opt.maxHeight
		opt.minHeight
		opt.maxWidth
		opt.minWidth
		opt.border = [true, true, true, true]
		opt.corner = [true, true, true, true]
	*/
	$.widget.resize = function (element, opt) {
		var options       = opt || {};
		options.maxHeight = options.maxHeight || null;
		options.minHeight = options.minHeight || null;
		options.maxWidth  = options.maxWidth || null;
		options.minWidth  = options.minWidth || null;
		options.direction = options.direction || 'all';
		options.border    = options.border || [true, true, true, true];
		options.corner    = options.corner || [true, true, true, true];

		$.addClass(element, 'morn-resizable');

		if (options.border[0]) {
			addResizeBorderN(element);
		}
		if (options.border[1]) {
			addResizeBorderS(element);
		}
		if (options.border[2]) {
			addResizeBorderW(element);
		}
		if (options.border[3]) {
			addResizeBorderE(element);
		}
	};

	function addCornerButton (element, controller) {
		$.addEventHandler(resizer, 'mousedown', function(e){
			var startX      = e.clientX,
				startY      = e.clientY,
				startWidth  = parseInt($(element).getComputedStyle('width'),10),
				startHeight = parseInt($(element).getComputedStyle('height'),10),
				drag        = function(e) {
					if ($.event(e).which === -1) {
						release();
					}
					element.style.width  = (startWidth + e.clientX - startX) + 'px';
					element.style.height = (startHeight + e.clientY - startY) + 'px';
				},
				release     = function() {
					$.removeEventHandler(document.documentElement, 'mouseup', release);
					$.removeEventHandler(document.documentElement, 'mousemove', drag);
				};

			$.addEventHandler(document.documentElement, 'mouseup', release);
			$.addEventHandler(document.documentElement, 'mousemove', drag);
		});
	}

	function addResizeBorderN (element) {
		var controller = $.createDom('<div class=\'morn-resizable-border-n\'/>');
		$.append(element, controller);
		$.addEventHandler(controller, 'mousedown', function(e){
			var startY      = e.clientY,
				startTop    = Math.max(parseInt($(element).getComputedStyle('top'), 0), 10),
				startHeight = Math.max(parseInt($(element).getComputedStyle('height'), 0), 10),
				drag        = function(e) {
					if ($.event(e).which === -1) {
						release();
					}
					element.style.top = (startTop + e.clientY - startY) + 'px';
					element.style.height = Math.max((startHeight - e.clientY + startY), 0) + 'px';
				},
				release     = function() {
					$.removeEventHandler(document.documentElement, 'mouseup', release);
					$.removeEventHandler(document.documentElement, 'mousemove', drag);
				};

			$.addEventHandler(document.documentElement, 'mouseup', release);
			$.addEventHandler(document.documentElement, 'mousemove', drag);
		});
	}

	function addResizeBorderS (element) {
		var controller = $.createDom('<div class=\'morn-resizable-border-s\'/>');
		$.append(element, controller);
		$.addEventHandler(controller, 'mousedown', function(e){
			var startY      = e.clientY,
				startHeight = parseInt($(element).getComputedStyle('height'), 10),
				drag        = function(e) {
					element.style.height = Math.max((startHeight + e.clientY - startY), 0) + 'px';
				},
				release     = function() {
					if ($.event(e).which === -1) {
						release();
					}
					$.removeEventHandler(document.documentElement, 'mouseup', release);
					$.removeEventHandler(document.documentElement, 'mousemove', drag);
				};

			$.addEventHandler(document.documentElement, 'mouseup', release);
			$.addEventHandler(document.documentElement, 'mousemove', drag);
		});
	}

	function addResizeBorderE (element) {
		var controller = $.createDom('<div class=\'morn-resizable-border-e\'/>');
		$.append(element, controller);
		$.addEventHandler(controller, 'mousedown', function(e){
			var startX     = e.clientX,
				startWidth = parseInt($(element).getComputedStyle('width'), 10),
				drag       = function(e) {
					if ($.event(e).which === -1) {
						release();
					}
					element.style.width = Math.max((startWidth + e.clientX - startX), 0) + 'px';
				},
				release    = function() {
					$.removeEventHandler(document.documentElement, 'mouseup', release);
					$.removeEventHandler(document.documentElement, 'mousemove', drag);
				};

			$.addEventHandler(document.documentElement, 'mouseup', release);
			$.addEventHandler(document.documentElement, 'mousemove', drag);
		});
	}

	function addResizeBorderW (element) {
		var controller = $.createDom('<div class=\'morn-resizable-border-w\'/>');
		$.append(element, controller);
		$.addEventHandler(controller, 'mousedown', function(e){
			var startX     = e.clientX,
				startWidth = parseInt($(element).getComputedStyle('width'), 10),
				startLeft  = parseInt($(element).getComputedStyle('left'),10),
				drag       = function(e) {
					if ($.event(e).which === -1) {
						release();
					}
					element.style.left  = (startLeft + e.clientX - startX) + 'px';
					element.style.width = Math.max(startWidth - (e.clientX - startX), 0) + 'px';
				},
				release = function() {
					$.removeEventHandler(document.documentElement, 'mouseup', release);
					$.removeEventHandler(document.documentElement, 'mousemove', drag);
				};

			$.addEventHandler(document.documentElement, 'mouseup', release);
			$.addEventHandler(document.documentElement, 'mousemove', drag);
		});
	}

	$.widget.resizeController = function(element, controller, opt) {
		// body...
	};

}(morn));