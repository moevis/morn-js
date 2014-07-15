/*! morn-js - v0.0.1 - 2014-07-15 */
'use strict';

var morn = (function(){

	var $ = {};
	
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
				if (el.length) {
					for (var i = el.length - 1; i >= 0; i--) {
						el[i].addEventListener(ev, fn, false);
					}
				} else {
					el.addEventListener(ev, fn, false);
				}
            };
        } else if (window.attachEvent) {
            return function (el, ev, fn) {
            	if (el.length) {

				} else {
					el.attachEvent('on' + ev, fn);
				}
			};
        } else {
            return function (el, ev, fn) {
            	if (el.length) {
					for (var i = el.length - 1; i >= 0; i--) {
						el[i]['on' + ev] =  fn;
					}
            	} else {
					el['on' + ev] =  fn;
            	}
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
            return function (el, ev) {
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

	$.createDom = function(str){
		var tmpNodes = [],
			tmp = document.createElement('div'),
			node;
		tmp.innerHTML = str;
		for (var i = 0, len = tmp.children.length; i < len; i++) {
			tmpNodes.push(tmp.children[i]);
		};
		// tmp.children
		// while(node = tmp.firstChild){
		// 	tmpNodes.push(node);
		// }
		return tmpNodes;
	};

	$.append = function(element, children) {
		if (children.length) {
			for (var i = children.length - 1; i >= 0; i--) {
				element.appendChild(children[i]);
			}
		} else {
			element.appendChild(children);
		}
	}

	$.widget = {};

	return $;
}());
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

	function addResizeButton (element, controller) {
		$.addEventHandler(resizer, 'mousedown', function(e){
			var startX = e.clientX,
				startY = e.clientY,
				startWidth = parseInt($.getComputedStyle(element, 'width'),10),
				startHeight = parseInt($.getComputedStyle(element, 'height'),10),
				drag = function(e) {
					element.style.width  = (startWidth + e.clientX - startX) + 'px';
					element.style.height = (startHeight + e.clientY - startY) + 'px';
				},
				release = function() {
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
			var startY = e.clientY,
				startTop = parseInt($.getComputedStyle(element, 'top'),10),
				drag = function(e) {
					element.style.top = (startTop - e.clientY + startY) + 'px';
				},
				release = function() {
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
			var startY = e.clientY,
				startHeight = parseInt($.getComputedStyle(element, 'height'),10),
				drag = function(e) {
					element.style.height = (startHeight + e.clientY - startY) + 'px';
				},
				release = function() {
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
			var startX = e.clientX,
				startWidth = parseInt($.getComputedStyle(element, 'width'),10),
				drag = function(e) {
					element.style.width  = (startWidth + e.clientX - startX) + 'px';
				},
				release = function() {
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
			var startX = e.clientX,
				startLeft = parseInt($.getComputedStyle(element, 'left'),10),
				drag = function(e) {
					element.style.left  = (startLeft + e.clientX - startX) + 'px';
					element.style.width = parseInt(element.style.width, 10) - (e.clientX - startX) + 'px';
					console.log(e.clientX - startX);
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
	}
}(morn));