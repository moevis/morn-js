/*! morn-js - v0.0.1 - 2014-07-16 */
'use strict';

var morn = (function(){

	var mornjs = function(selector, context) {
		if (selector !== undefined ) {
			if (selector.nodeType !== undefined || selector.length !== undefined) {
				return mornjs.prototype.$(selector);
			} else if (selector.constructor === mornjs) {
				return selector;
			} else if (typeof selector === 'string'){
				return mornjs.prototype.$(mornjs.id('string', context));
			}
		}

	};

	mornjs.prototype.$ = function(dom) {
		this.dom = dom;
		return this;
	};

	mornjs.prototype.getObj = function() {
		return this.dom;
	};
	
	// get element
	mornjs.id = function(id, scope) {
		if (scope) {
			return scope.getElementById(id);
		} else {
			return document.getElementById(id);
		}
	};

	mornjs.tag = function(tag, scope) {
		if (scope) {
			return scope.getElementsByTagName(tag);
		} else {
			return document.getElementsByTagName(tag);
		}
	};

	mornjs.classStyle = (function() {
		if (document.getElementsByClass) {
			return document.getElementsByClass;
		} else if (document.querySelector) {
			return function(classStyle) {
				return document.querySelectorAll('.' + classStyle);
			};
		} else return function(classStyle) {
			var result = [],
				elements = mornjs.tag('*');
			for (var i = 0, len = elements.length; i < len; i++) {
				if ((' ' + elements[i].className + ' ').indexOf(classStyle) !== -1) {
					result.push(elements[i]);
				}
			}
			return result;
		};
	}());

	// mornjs.ready = function(func) {
	// 	mornjs(document).addEventHandler('DOMContentLoaded', func);
	// };

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

	mornjs.prototype.addEventHandler = (function () {
		if (window.addEventListener) {
			return function (ev, fn) {
				if (this.dom.length) {
					for (var i = this.dom.length - 1; i >= 0; i--) {
						this.dom[i].addEventListener(ev, fn, false);
					}
				} else {
					this.dom.addEventListener(ev, fn, false);
				}
            };
        } else if (window.attachEvent) {
            return function (ev, fn) {
            	if (this.dom.length) {
					for (var i = this.dom.length - 1; i >= 0; i--) {
						this.dom[i].attachEvent(ev, fn);
					}
				} else {
					this.dom.attachEvent('on' + ev, fn);
				}
			};
        } else {
            return function (ev, fn) {
            	if (this.dom.length) {
					for (var i = this.dom.length - 1; i >= 0; i--) {
						this.dom[i]['on' + ev] =  fn;
					}
            	} else {
					this.dom['on' + ev] =  fn;
            	}
			};
		}
	}());

	mornjs.addEventHandler = (function () {
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
					for (var i = el.length - 1; i >= 0; i--) {
						el[i].attachEvent(ev, fn);
					}
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

	mornjs.prototype.removeEventHandler = (function () {
		if (window.removeEventListener) {
			return function (ev, fn) {
				this.dom.removeEventListener(ev, fn);
            };
        } else if (window.dettachEvent) {
            return function (ev, fn) {
				this.dom.dettachEvent('on' + ev, fn);
			};
        } else {
            return function (ev) {
				this.dom['on' + ev] =  null;
			};
		}
	}());

	mornjs.removeEventHandler = (function () {
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

	mornjs.prototype.addClass = (function () {
		if (document.documentElement.classList) {
			return function (classStyle) {
				this.dom.classList.add(classStyle);
			};
		}else{
			return function (classStyle) {
				var c = ' ' + this.dom.className + ' ';
				if (c.indexOf(' ' + classStyle + ' ') == -1) {
					this.dom.className += ' ' + classStyle;
				}
			};
		}
	}());

	mornjs.addClass = (function () {
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

	mornjs.prototype.removeClass = (function () {
		if (document.documentElement.classList) {
			return function (classStyle) {
				this.dom.classList.remove(classStyle);
			};
		}else{
			return function (classStyle) {
				this.dom.className = this.dom.className.replace('/\\b' + classStyle + '\\b/g', '');
			};
		}
	}());

	mornjs.removeClass = (function () {
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

	mornjs.prototype.getComputedStyle = function(name) { 
		if (this.dom.style[name]) {
			return this.dom.style[name]; 
		} else if (this.dom.currentStyle) {
			return this.dom.currentStyle[name]; 
		} else if (document.defaultView && document.defaultView.getComputedStyle) { 
			name = name.replace(/([A-Z])/g,'-$1'); 
			name = name.toLowerCase(); 
			var s = document.defaultView.getComputedStyle(this.dom,''); 
			return s && s.getPropertyValue(name); 
		} else {
			return null; 
		}
	};

	mornjs.getComputedStyle = function( elem, name ) { 
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

	mornjs.createDom = function(str){
		var tmpNodes = [],
			tmp = document.createElement('div');
		tmp.innerHTML = str;
		for (var i = 0, len = tmp.children.length; i < len; i++) {
			tmpNodes.push(tmp.children[i]);
		}
		// tmp.children
		// while(node = tmp.firstChild){
		// 	tmpNodes.push(node);
		// }
		return tmpNodes;
	};

	mornjs.prototype.append = function(children) {
		if (children.length) {
			for (var i = children.length - 1; i >= 0; i--) {
				this.dom.element.appendChild(children[i]);
			}
		} else {
			this.dom.appendChild(children);
		}
	};

	mornjs.append = function(element, children) {
		if (children.length) {
			for (var i = children.length - 1; i >= 0; i--) {
				element.appendChild(children[i]);
			}
		} else {
			element.appendChild(children);
		}
	}

	mornjs.widget = {};

	return mornjs;
}());
'use strict';
/** 
 * This page of code is from the page: http://stackoverflow.com/questions/5916900/detect-version-of-browser
 * To get browser and version
 */

(function ($) {
	$.browser = (function(){
		var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
		if(/trident/i.test(M[1])){
			tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
			return 'IE '+(tem[1]||'');
		}   
	    if(M[1]==='Chrome'){
			tem=ua.match(/\bOPR\/(\d+)/)
			if(tem!=null) {
				return 'Opera '+tem[1];
			}
		}   
	    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
	    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
	    return {
	    	browser:M[0], version: M[1]
	    };
	}());
}(morn));
'use strict';

(function($){
	var documentReady = false,
		startup = [];
	
	var onDomReady = function(){
		if (documentReady === false) {
			try {
			    document.documentElement.doScroll('left');
			} catch( error ) {
			    setTimeout( arguments.callee, 50);
			    return;
			}
			for (var i = 0, len = startup.length; i < len; i++) {
				startup[i]();
			}
		}
		documentReady = true;
	};

	$.ready = (function() {
		if ($.browser.browser === 'MSIE' && $.browser.version < 9){
			$.addEventHandler(document, 'readystatechange',function() {
				if (document.readyState == 'complete') {
					document.onreadystatechange = null;
					onDomReady();
				}
			});
			return function (func) {
				startup.push(func);
			};
		} else {
			return function (func) {
				$.addEventHandler(document, 'DOMContentLoaded', func);
			};
		}
	}());

}(morn));
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
				startTop    = parseInt($(element).getComputedStyle('top'), 10),
				startHeight = parseInt($(element).getComputedStyle('height'), 10),
				drag        = function(e) {
					element.style.top = (startTop + e.clientY - startY) + 'px';
					element.style.height = (startHeight - e.clientY + startY) + 'px';
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

	function addResizeBorderE (element) {
		var controller = $.createDom('<div class=\'morn-resizable-border-e\'/>');
		$.append(element, controller);
		$.addEventHandler(controller, 'mousedown', function(e){
			var startX     = e.clientX,
				startWidth = parseInt($(element).getComputedStyle('width'), 10),
				drag       = function(e) {
					element.style.width = (startWidth + e.clientX - startX) + 'px';
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
					element.style.left  = (startLeft + e.clientX - startX) + 'px';
					element.style.width = startWidth - (e.clientX - startX) + 'px';
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