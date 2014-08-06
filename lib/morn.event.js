'use strict';

define('event', ['core', 'browser'], function($) {
	
	$.event = function(e) {
		return $.event.prototype.init(e || window.event);
	};

	$.event.prototype.init = function(e) {
		this.e = e;
		return this;
	};

	$.event.prototype.init.prototype = $.event.prototype;

	$.event.prototype.preventDefault = function () {
		if (this.e.preventDefault) {
			this.e.preventDefault();
		}
		this.e.returnValue = false;
	};

	$.event.prototype.stopPropagation = function () {
		if (this.e.stopPropagation) {
			this.e.stopPropagation();
		}
		this.e.cancelBubble = true;
	};

	$.event.prototype.target = function () {
		return this.e.target || this.e.srcElement || document;
	};

	$.event.prototype.postion = function() {
		var pos = [0, 0];
		if (this.e.pageX || this.e.pageY) {
			pos[0] = this.e.pageX;
			pos[1] = this.e.pageY;
		} else if (this.e.clientX || this.e.clientY) {
			pos[0] = this.e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			pos[1] = this.e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return pos;
	};

	$.event.prototype.relatedTarget = function() {
		return this.e.relatedTarget || this.e.fromElement || this.e.toElement;
	};

	$.event.prototype.which = function() {
		if (this.e.which !== undefined) {
			return this.e.which;
		} else if (this.e.button !== undefined) {
			if (this.e.button & 1) return 0;      // Left
			else if (this.e.button & 4) return 1; // Middle
			else if (this.e.button & 2) return 2; // Right
			else return -1;
		} else {
			return -1;
		}
	};

	$.prototype.click = function(func) {
		$.addEventHandler('click', func);
		return this;
	};

	$.prototype.mousemove = function(func) {
		$.addEventHandler('mousemove', func);
		return this;
	};

	$.prototype.mousedown = function(func) {
		$.addEventHandler('mousedown', func);
		return this;
	};

	$.prototype.mouseup = function(func) {
		$.addEventHandler('mouseup', func);
		return this;
	};

	$.prototype.mouseover = function(func) {
		$.addEventHandler('mouseover', func);
		return this;
	};

	$.prototype.mouseout = function(func) {
		$.addEventHandler('mouseout', func);
		return this;
	};

	$.prototype.mousewheel = function(func) {
		$.addEventHandler('mousewheel', func);
		return this;
	};

	$.prototype.dblclick = function(func) {
		$.addEventHandler('dblclick', func);
		return this;
	};

	$.prototype.load = function(func) {
		$.addEventHandler('load', func);
		return this;
	};

	$.prototype.error = function(func) {
		$.addEventHandler('error', func);
		return this;
	};

	$.prototype.unload = function(func) {
		$.addEventHandler('unload', func);
		return this;
	};

	$.prototype.resize = function(func) {
		$.addEventHandler('resize', func);
		return this;
	};

	$.prototype.keydown = function(func) {
		$.addEventHandler('keydown', func);
		return this;
	};

	$.prototype.keyup = function(func) {
		$.addEventHandler('keyup', func);
		return this;
	};

	$.prototype.keypress = function(func) {
		$.addEventHandler('keypress', func);
		return this;
	};

	$.prototype.submit = function(func) {
		$.addEventHandler('submit', func);
		return this;
	};

	$.prototype.blur = function(func) {
		$.addEventHandler('blur', func);
		return this;
	};

	$.prototype.select = function(func) {
		$.addEventHandler('select', func);
		return this;
	};

	$.prototype.change = function(func) {
		$.addEventHandler('change', func);
		return this;
	};

	$.prototype.focus = function(func) {
		$.addEventHandler('focus', func);
		return this;
	};
});