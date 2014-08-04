'use strict';

define('animate', ['core', 'promise', 'dom'], function($) {
	var queque = [];

	$.tween = {
		linear: function(k) {
			return k;
		}
	};

	$.prototype.addAnimate = function(attri, value, time, easing) {
		var promise = $.promise(),
			origin = $.getComputedStyle(this.dom[0], attri),
			element = this.dom[0],
			eclapse = 0,
			startTime = Date.now(),
			startValue = parseFloat(origin),
			endValue = parseFloat(value);
	
		easing = easing || $.tween.linear;

		var timer = setInterval(function(){
				eclapse = Date.now() - startTime;
				if (eclapse >= time) {
					element.style[attri] = value;
					promise.resolve();
					clearInterval(timer);
				} else {
					element.style[attri] = startValue + easing(eclapse / time) * (endValue - startValue) + 'px';
				}
			}, 17);
		return promise;
	}
});