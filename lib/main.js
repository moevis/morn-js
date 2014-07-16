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
					this.dom['on' + ev] =  fn;
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
					el['on' + ev] =  fn;
            	}
			};
		}
	}());

	mornjs.prototype.removeEventHandler = (function () {
		if (window.removeEventListener) {
			return function (ev, fn) {
				this.dom.removeEventListener(ev, fn);
				return this;
            };
        } else if (window.detachEvent) {
            return function (ev, fn) {
				this.dom.detachEvent('on' + ev, fn);
				return this;
			};
        } else {
            return function (ev) {
				this.dom['on' + ev] =  null;
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
				el['on' + ev] =  null;
			};
		}
	}());

	mornjs.prototype.addClass = (function () {
		if (document.documentElement.classList) {
			return function (classStyle) {
				this.dom.classList.add(classStyle);
				return this;
			};
		}else{
			return function (classStyle) {
				var c = ' ' + this.dom.className + ' ';
				if (c.indexOf(' ' + classStyle + ' ') == -1) {
					this.dom.className += ' ' + classStyle;
				}
				return this;
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
				return this;
			};
		}else{
			return function (classStyle) {
				this.dom.className = this.dom.className.replace('/\\b' + classStyle + '\\b/g', '');
				return this;
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

	mornjs.prototype.height = function(width) {
		if (width === undefined) {
			var rect;
			if (this.dom.length !== undefined && this.dom.length !== 0) {
				rect = this.dom[0].getBoundingClientRect();
			} else {
				rect = this.dom.getBoundingClientRect();
			}
			return rect.bottom - rect.top;
		}
	}

	mornjs.prototype.rect = function(width) {
		if (width === undefined) {
			var rect;
			if (this.dom.length !== undefined && this.dom.length !== 0) {
				rect = this.dom[0].getBoundingClientRect();
			} else {
				rect = this.dom.getBoundingClientRect();
			}
			return rect;
		}
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
		if (children.length) {
			for (var i = children.length - 1; i >= 0; i--) {
				this.dom.element.appendChild(children[i]);
			}
		} else {
			this.dom.appendChild(children);
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

	mornjs.widget = {};

	return mornjs;
}());