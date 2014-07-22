'use strict';

(function($) {
	$.widget.sticky = function(element, opt) {
		var option = opt || {};
			option.topOffset = option.scrollTop || 0;
		var elementTop = $(element).rect().top,
			offset = option.topOffset + elementTop,
			isSticky = false,
			originalPostion = $(element).getComputedStyle('position');
		$(window).addEventHandler('scroll', function(){
			if (document.body.scrollTop > offset) {
				if (!isSticky) {
					element.dom.style.position = 'fixed';
					element.dom.style.top = offset + 'px';
				}
			} else {
				if (isSticky) {
					element.dom.style.top = elementTop;
					element.dom.style.position = originalPostion;
				}
			}
		});
	};
}(morn));