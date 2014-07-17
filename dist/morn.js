/*! morn-js - v0.0.1 - 2014-07-17 */
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

	$.classStyle = (function() {
		if (document.getElementsByClass) {
			return function(classStyle, scope) {
				var dom = scope || document;
				return dom.getElementsByClass(classStyle);
			};
		} else if (document.querySelector) {
			return function(classStyle, scope) {
				var dom = scope || document;
				return dom.querySelectorAll('.' + classStyle);
			};
		} else return function(classStyle, scope) {
			var result = [],
				dom = scope || document,
				elements = dom.getElementsByTagName('*');
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

	mornjs.event = function(e) {
		return mornjs.event.prototype.$(e || window.event);
	};

	mornjs.event.prototype.$ = function(e) {
		this.e = e;
		return this;
	};

	mornjs.event.prototype.$.prototype = mornjs.event.prototype;

	mornjs.event.prototype.preventDefault = function () {
		if (this.e.preventDefault) {
			this.e.preventDefault();
		}
		this.e.returnValue = false;
	};

	mornjs.event.prototype.stopPropagation = function () {
		if (this.e.stopPropagation) {
			this.e.stopPropagation();
		}
		this.e.cancelBubble = true;
	};

	mornjs.event.prototype.target = function () {
		return this.e.target || this.e.srcElement || document;
	};

	mornjs.event.prototype.postion = function() {
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

	mornjs.event.prototype.relatedTarget = function() {
		return this.e.relatedTarget || this.e.fromElement || this.e.toElement;
	};

	mornjs.event.prototype.which = function() {
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
				return this;
            };
        } else if (window.attachEvent) {
            return function (ev, fn) {
            	if (this.dom.length) {
					for (var i = this.dom.length - 1; i >= 0; i--) {
						this.dom[i].attachEvent('on' + ev, fn);
					}
				} else {
					this.dom.attachEvent('on' + ev, fn);
				}
				return this;
			};
        } else {
            return function (ev, fn) {
            	if (this.dom.length) {
					for (var i = this.dom.length - 1; i >= 0; i--) {
						this.dom[i]['on' + ev] =  fn;
					}
            	} else {
					this.dom['on' + ev] = fn;
            	}
				return this;
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
						el[i].attachEvent('on' + ev, fn);
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
					el['on' + ev] = fn;
            	}
			};
		}
	}());

	mornjs.prototype.removeEventHandler = (function () {
		if (window.removeEventListener) {
			return function (ev, fn) {
				if (this.dom.length) {
					for (var i = this.dom.length - 1; i >= 0; i--) {
						this.dom[i].removeEventListener(ev, fn);
					}
				} else {
					this.dom.removeEventListener(ev, fn);
				}
				return this;
            };
        } else if (window.detachEvent) {
            return function (ev, fn) {
				if (this.dom.length) {
					for (var i = this.dom.length - 1; i >= 0; i--) {
						this.dom[i].detachEvent('on' + ev, fn);
					}
				} else {
					this.dom.detachEvent('on' + ev, fn);
				}
				return this;
			};
        } else {
            return function (ev) {
            	if (this.dom.length) {
					for (var i = this.dom.length - 1; i >= 0; i--) {
						this.dom[i]['on' + ev] = null;
					}
            	} else {
					this.dom['on' + ev] = null;
            	}
				
				return this;
			};
		}
	}());

	mornjs.removeEventHandler = (function () {
		if (window.removeEventListener) {
			return function (el, ev, fn) {
				el.removeEventListener(ev, fn);
            };
        } else if (window.detachEvent) {
            return function (el, ev, fn) {
				el.detachEvent('on' + ev, fn);
			};
        } else {
            return function (el, ev) {
            	if (el.length) {
					for (var i = el.length - 1; i >= 0; i--) {
						el[i]['on' + ev] = null;
					}
            	} else {
					el['on' + ev] = null;
            	}
			};
		}
	}());

	mornjs.prototype.addClass = (function () {
		if (document.documentElement.classList) {
			return function (classStyle) {
				if (this.dom.length) {
					for (var i = this.dom.length - 1; i >= 0; i--) {
						this.dom[i].classList.add(classStyle);
					}
				} else {
					this.dom.classList.add(classStyle);
				}
				return this;
			};
		}else{
			return function (classStyle) {
				if (this.dom.length) {
					for (var i = this.dom.length - 1; i >= 0; i--) {
						var c = ' ' + this.dom.className + ' ';
						if (c.indexOf(' ' + classStyle + ' ') == -1) {
							this.dom.className += ' ' + classStyle;
						}
					}
				} else {
					var c = ' ' + this.dom.className + ' ';
					if (c.indexOf(' ' + classStyle + ' ') == -1) {
						this.dom.className += ' ' + classStyle;
					}
				}
				return this;
			};
		}
	}());

	mornjs.addClass = (function () {
		if (document.documentElement.classList) {
			return function (el, classStyle) {
				if (el.length) {
					for (var i = el.length - 1; i >= 0; i--) {
						el[i].classList.add(classStyle);
					}
				} else {
					el.classList.add(classStyle);
				}
			};
		}else{
			return function (el, classStyle) {
				if (el.length) {
					for (var i = el.length - 1; i >= 0; i--) {
						var c = ' ' + el.className + ' ';
						if (c.indexOf(' ' + classStyle + ' ') == -1) {
							el.className += ' ' + classStyle;
						}
					}
				} else {
					var c = ' ' + el.className + ' ';
					if (c.indexOf(' ' + classStyle + ' ') == -1) {
						el.className += ' ' + classStyle;
					}
				}
			};
		}
	}());

	mornjs.prototype.removeClass = (function () {
		if (document.documentElement.classList) {
			return function (classStyle) {
				if (this.dom.length) {
					for (var i = this.dom.length - 1; i >= 0; i--) {
						this.dom[i].classList.remove(classStyle);
					}
				} else {
					this.dom.classList.remove(classStyle);
				}
				return this;
			};
		}else{
			return function (classStyle) {
				if (this.dom.length) {
					for (var i = this.dom.length - 1; i >= 0; i--) {
						this.dom[i].this.dom.className = this.dom.className.replace(new RegExp('\\b' + classStyle + '\\b','g'), '');
					}
				} else {
					this.dom.className = this.dom.className.replace(new RegExp('\\b' + classStyle + '\\b','g'), '');
				}
				return this;
			};
		}
	}());

	mornjs.removeClass = (function () {
		if (document.documentElement.classList) {
			return function (el, classStyle) {
				if (el.length) {
					for (var i = el.length - 1; i >= 0; i--) {
						el[i].classList.remove(classStyle);
					}
				} else {
					el.classList.remove(classStyle);
				}
			};
		}else{
			return function (el, classStyle) {
				if (el.length) {
					for (var i = el.length - 1; i >= 0; i--) {
						el[i].el.className = el.className.replace(new RegExp('\\b' + classStyle + '\\b','g'), '');
					}
				} else {
					el.className = el.className.replace(new RegExp('\\b' + classStyle + '\\b','g'), '');
				}
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

	mornjs.prototype.width = function(width) {
		if (width === undefined) {
			var rect;
			if (this.dom.length !== undefined && this.dom.length !== 0) {
				rect = this.dom[0].getBoundingClientRect();
			} else {
				rect = this.dom.getBoundingClientRect();
			}
			return rect.right - rect.left;
		}
	}

	mornjs.prototype.height = function(height) {
		if (height === undefined) {
			var rect;
			if (this.dom.length !== undefined && this.dom.length !== 0) {
				rect = this.dom[0].getBoundingClientRect();
			} else {
				rect = this.dom.getBoundingClientRect();
			}
			return rect.bottom - rect.top;
		}
	}

	mornjs.prototype.rect = function() {
		// if (width === undefined) {
			var rect;
			if (this.dom.length !== undefined && this.dom.length !== 0) {
				rect = this.dom[0].getBoundingClientRect();
			} else {
				rect = this.dom.getBoundingClientRect();
			}
			return rect;
		// }
	}

	mornjs.createDom = function(str){
		var tmpNodes = [],
			tmp = document.createElement('div');
		tmp.innerHTML = str;
		for (var i = 0, len = tmp.children.length; i < len; i++) {
			tmpNodes.push(tmp.children[i]);
		}
		return tmpNodes;
	};

	mornjs.prototype.append = function(children) {
		var dom;
		if (this.dom.length) {
			dom = this.dom[0];
		} else {
			dom = this.dom;
		}

		if (dom === undefined) {
			return this;
		}

		if (children.length) {
			for (var i = children.length - 1; i >= 0; i--) {
				dom.element.appendChild(children[i]);
			}
		} else {
			dom.appendChild(children);
		}
		return this;
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

	mornjs.prototype.prepend = function(children) {
		var dom;
		if (this.dom.length) {
			dom = this.dom[0];
		} else {
			dom = this.dom;
		}

		if (dom === undefined) {
			return this;
		}

		if (children.length) {
			for (var i = children.length - 1; i >= 0; i--) {
				dom.insertBefore(children[i], dom.firstChild);
			}
		} else {
			dom.insertBefore(children, dom.firstChild);
		}

		return this;
	};

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
			    return ;
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
				startWidth  = parseInt($(element).width(),10),
				startHeight = parseInt($(element).height(),10),
				drag        = function(e) {
					element.style.width  = (startWidth + e.clientX - startX) + 'px';
					element.style.height = (startHeight + e.clientY - startY) + 'px';
				},
				release     = function() {
					$(document.documentElement).removeEventHandler('mouseup', release).removeEventHandler('mousemove', drag);
				};

			$(document.documentElement).addEventHandler('mouseup', release).addEventHandler('mousemove', drag);
		});
	}

	function addResizeBorderN (element) {
		var controller = $.createDom('<div class=\'morn-resizable-border-n\'/>');
		$(element).prepend(controller);
		$.addEventHandler(controller, 'mousedown', function(e){
			var startY      = e.clientY,
				startTop    = Math.max(parseInt($(element).rect().top, 0), 10),
				startHeight = Math.max(parseInt($(element).height(), 0), 10),
				drag        = function(e) {
					element.style.top = (startTop + e.clientY - startY) + 'px';
					element.style.height = Math.max((startHeight - e.clientY + startY), 0) + 'px';
				},
				release     = function() {
					$(document.documentElement).removeEventHandler('mouseup', release).removeEventHandler('mousemove', drag);
					$(element).removeClass('morn-resizable-resizing');
				};
			$(element).addClass('morn-resizable-resizing');
			$(document.documentElement).addEventHandler('mouseup', release).addEventHandler('mousemove', drag);
		});
	}

	function addResizeBorderS (element) {
		var controller = $.createDom('<div class=\'morn-resizable-border-s\'/>');
		$.append(element, controller);
		$.addEventHandler(controller, 'mousedown', function(e){
			var startY      = e.clientY,
				startHeight = parseInt($(element).height(), 10),
				drag        = function(e) {
					element.style.height = Math.max((startHeight + e.clientY - startY), 0) + 'px';
				},
				release     = function() {
					$(document.documentElement).removeEventHandler('mouseup', release).removeEventHandler('mousemove', drag);
					$(element).removeClass('morn-resizable-resizing');
				};
			$(element).addClass('morn-resizable-resizing');
			$(document.documentElement).addEventHandler('mouseup', release).addEventHandler('mousemove', drag);
		});
	}

	function addResizeBorderE (element) {
		var controller = $.createDom('<div class=\'morn-resizable-border-e\'/>');
		$.append(element, controller);
		$.addEventHandler(controller, 'mousedown', function(e){
			var startX     = e.clientX,
				startWidth = parseInt($(element).width(), 10),
				drag       = function(e) {
					element.style.width = Math.max((startWidth + e.clientX - startX), 0) + 'px';
				},
				release    = function() {
					$(document.documentElement).removeEventHandler('mouseup', release).removeEventHandler('mousemove', drag);
					$(element).removeClass('morn-resizable-resizing');
				};
			$(element).addClass('morn-resizable-resizing');
			$(document.documentElement).addEventHandler('mouseup', release).addEventHandler('mousemove', drag);
		});
	}

	function addResizeBorderW (element) {
		var controller = $.createDom('<div class=\'morn-resizable-border-w\'/>');
		$(element).prepend(controller);
		$.addEventHandler(controller, 'mousedown', function(e){
			var startX     = e.clientX,
				startWidth = parseInt($(element).width(), 10),
				startLeft  = parseInt($(element).rect().left,10),
				drag       = function(e) {
					element.style.left  = (startLeft + e.clientX - startX) + 'px';
					element.style.width = Math.max(startWidth - (e.clientX - startX), 0) + 'px';
				},
				release = function() {
					$(document.documentElement).removeEventHandler('mouseup', release).removeEventHandler('mousemove', drag);
					$(element).removeClass('morn-resizable-resizing');
				};
			$(element).addClass('morn-resizable-resizing');
			$(document.documentElement).addEventHandler('mouseup', release).addEventHandler('mousemove', drag);
		});
	}

	$.widget.resizeController = function(element, controller, opt) {
		// body...
	};

}(morn));