var morn = (function(){

	$ = {};
	
	// get element
	$.id = function(id, scope) {
		if (scope) {
			return scope.getElementById(id);
		} else {
			return document.getElementById(id);
		}
	};

	$.tag = function(tag, scope) {
		if (scope) {
			return scope.getElementsByTagName(tag);
		} else {
			return document.getElementsByTagName(tag);
		}
	};

	$.class = (function() {
		if (document.getElementsByClass) {
			return document.getElementsByClass;
		} else if (document.querySelector) {
			return function(classStyle) {
				return document.querySelectorAll('.' + classStyle);
			};
		} else return function(classStyle) {
			var result = [],
				elements = $.tag('*');
			for (var i = 0, len = elements.length; i < len; i++) {
				if ((' ' + elements[i].className + ' ').indexOf(classStyle) !== -1) {
					result.push(elements[i]);
				}
			}
			return result;
		};
	}());

	$.ready = function(func) {
		$.addEventHandler(document, 'DOMContentLoaded', func);
	};

	function Event(e) {
		this.e = e;
	}

	Event.prototype.preventDefault = function () {
		if (this.e.preventDefault) {
			this.e.preventDefault();
		}
		this.e.returnValue = false;
	};

	Event.prototype.stopPropagation = function () {
		if (this.e.stopPropagation) {
			this.e.stopPropagation();
		}
		this.e.cancelBubble = true;
	};

	Event.prototype.target = function () {
		return this.e.target || this.e.srcElement || document;
	};

	Event.prototype.postion = function() {
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

	Event.prototype.relatedTarget = function() {
		return this.e.relatedTarget || this.e.fromElement || this.e.toElement;
	};

	Event.prototype.which = function() {
		if (!this.e.which && this.e.button) {
			if (this.e.button & 1) return 0;      // Left
			else if (this.e.button & 4) return 1; // Middle
			else if (this.e.button & 2) return 2; // Right
		}
	};

	$.addEventHandler = (function () {
		if (window.addEventListener) {
			return function (el, ev, fn) {
				el.addEventListener(ev, fn, false);
            };
        } else if (window.attachEvent) {
            return function (el, ev, fn) {
				el.attachEvent('on' + ev, fn);
			};
        } else {
            return function (el, ev, fn) {
				el['on' + ev] =  fn;
			};
		}
	}());

	$.removeEventHandler = (function () {
		if (window.removeEventListener) {
			return function (el, ev, fn) {
				el.removeEventListener(ev, fn);
            };
        } else if (window.dettachEvent) {
            return function (el, ev, fn) {
				el.dettachEvent('on' + ev, fn);
			};
        } else {
            return function (el, ev, fn) {
				el['on' + ev] =  null;
			};
		}
	}());

	$.addClass = (function () {
		if (document.documentElement.classList) {
			return function (el, classStyle) {
				el.classList.add(classStyle);
			};
		}else{
			return function (el, classStyle) {
				var c = ' ' + el.className + ' ';
				if (c.indexOf(' ' + classStyle + ' ') == -1) {
					el.className += ' ' + classStyle;
				}
			};
		}
	}());

	$.removeClass = (function () {
		if (document.documentElement.classList) {
			return function (el, classStyle) {
				el.classList.remove(classStyle);
			};
		}else{
			return function (el, classStyle) {
				el.className = el.className.replace('/\\b' + classStyle + '\\b/g', '');
			};
		}
	}());

	$.getComputedStyle = function( elem, name ) { 
		if (elem.style[name]) {
			return elem.style[name]; 
		} else if (elem.currentStyle) {
			return elem.currentStyle[name]; 
		} else if (document.defaultView && document.defaultView.getComputedStyle) { 
			name = name.replace(/([A-Z])/g,'-$1'); 
			name = name.toLowerCase(); 
			var s = document.defaultView.getComputedStyle(elem,''); 
			return s && s.getPropertyValue(name); 
		} else {
			return null; 
		}
	};

	$.widget = {};

	return $;
}());