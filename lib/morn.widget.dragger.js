'use strict';

(function($) {
	$.widget.resize = function (element, opt) {
		$.addEventHandler(element, 'mousedown', function(e){
			var startX = e.clientX,
				startY = e.clientY,
				startWidth = parseInt($.getComputedStyle(element, 'width'),10),
				startHeight = parseInt($.getComputedStyle(element, 'height'),10),
				drag = function(e) {
					element.style.width = (startWidth + e.clientX - startX) + 'px';
					element.style.height = (startHeight + e.clientY - startY) + 'px';
				},
				release = function() {
					$.removeEventHandler(document.documentElement, 'mouseup', release);
					$.removeEventHandler(document.documentElement, 'mousemove', drag);
				};

			$.addEventHandler(document.documentElement, 'mouseup', release);
			$.addEventHandler(document.documentElement, 'mousemove', drag);
		});
	};
}(morn));