/*! morn-js - v0.0.1 - 2014-08-01 */
'use strict';

var morn = (function(){

	var mornjs = function(selector, context) {
		if (selector !== undefined ) {
			if (typeof selector === 'string') {
				return new mornjs.prototype.init(mornjs.parseSelector(selector));
			} else if (mornjs.isNode(selector)) {
				return new mornjs.prototype.init(selector);
			} else if (selector.constructor === mornjs){
				return selector;
			}
		}

	};

	mornjs.prototype.init = mornjs.widget = function(dom) {
		if (dom.length === undefined || dom === window) {
			this.dom = [dom];
		} else {
			this.dom = dom;
		}
		return this;
	};

	mornjs.prototype.init.prototype = mornjs.prototype;

	mornjs.prototype.addEventHandler = (function () {
		if (window.addEventListener) {
			return function (ev, fn) {
				for (var i = this.dom.length - 1; i >= 0; i--) {
					this.dom[i].addEventListener(ev, fn, false);
				}
				return this;
            };
        } else if (window.attachEvent) {
            return function (ev, fn) {
				for (var i = this.dom.length - 1; i >= 0; i--) {
					this.dom[i].attachEvent('on' + ev, fn);
				}
				return this;
			};
        } else {
            return function (ev, fn) {
				for (var i = this.dom.length - 1; i >= 0; i--) {
					this.dom[i]['on' + ev] =  fn;
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
				for (var i = this.dom.length - 1; i >= 0; i--) {
					this.dom[i].removeEventListener(ev, fn);
				}
				return this;
            };
        } else if (window.detachEvent) {
            return function (ev, fn) {
				for (var i = this.dom.length - 1; i >= 0; i--) {
					this.dom[i].detachEvent('on' + ev, fn);
				}
				return this;
			};
        } else {
            return function (ev) {
				for (var i = this.dom.length - 1; i >= 0; i--) {
					this.dom[i]['on' + ev] = null;
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
				for (var i = this.dom.length - 1; i >= 0; i--) {
					this.dom[i].classList.add(classStyle);
				}
				return this;
			};
		}else{
			return function (classStyle) {
				for (var i = this.dom.length - 1; i >= 0; i--) {
					var c = ' ' + this.dom.className + ' ';
					if (c.indexOf(' ' + classStyle + ' ') == -1) {
						this.dom.className += ' ' + classStyle;
					}
				}
				return this;
			};
		}
	}());

	mornjs.prototype.hasClass = (function () {
		if (document.documentElement.classList) {
			return function (classStyle) {
				if (this.dom.length > 0) {
					return this.dom[0].classList.contains(classStyle);
				}
				return false;
			};
		}else{
			return function (classStyle) {
				if (this.dom.length > 0) {
					var c = ' ' + this.dom[0].className + ' ';
					return (c.indexOf(' ' + classStyle + ' ') !== -1);
				}
				return false;
			};
		}
	}());

	mornjs.hasClass = (function () {
		if (document.documentElement.classList) {
			return function (ele, classStyle) {
				if (mornjs.isNode(ele)) {
					return ele.classList.contains(classStyle);
				}
				return false;
			};
		}else{
			return function (ele, classStyle) {
				if (mornjs.isNode(ele)) {
					var c = ' ' + ele.className + ' ';
					return (c.indexOf(' ' + classStyle + ' ') !== -1);
				}
				return false;
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
				for (var i = this.dom.length - 1; i >= 0; i--) {
					this.dom[i].classList.remove(classStyle);
				}
				return this;
			};
		}else{
			return function (classStyle) {
				for (var i = this.dom.length - 1; i >= 0; i--) {
					this.dom[i].this.dom.className = this.dom.className.replace(new RegExp('\\b' + classStyle + '\\b','g'), '');
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
		if (this.dom.length > 0) {
			if (this.dom[0].style[name] && name !== undefined) {
				return this.dom[0].style[name];
			} else if (this.dom[0].currentStyle) {
				return this.dom[0].currentStyle[name];
			} else if (document.defaultView && document.defaultView.getComputedStyle) {
				var s = document.defaultView.getComputedStyle(this.dom[0]);
				if (name !== undefined) {
					name = name.replace(/([A-Z])/g,'-$1');
					name = name.toLowerCase();
					return s.getPropertyValue(name);
				} else {
					return s;
				}
			} else {
				return null;
			}
		}
	};

	mornjs.getComputedStyle = function( elem, name ) {
		if (elem.style[name] && name !== undefined) {
			return elem.style[name];
		} else if (elem.currentStyle) {
			return elem.currentStyle[name];
		} else if (document.defaultView && document.defaultView.getComputedStyle) {
			var s = document.defaultView.getComputedStyle(elem);
			if (name !== undefined) {
				name = name.replace(/([A-Z])/g,'-$1');
				name = name.toLowerCase();
				return s.getPropertyValue(name);
			} else {
				return s;
			}
		} else {
			return null;
		}
	};

	mornjs.prototype.width = function(width) {
		if (width === undefined) {
			var rect;
			if (this.dom.length > 0) {
				rect = this.dom[0].getBoundingClientRect();
				return rect.right - rect.left;
			}
		}
	}

	mornjs.prototype.height = function(height) {
		if (height === undefined) {
			var rect;
			if (this.dom.length !== 0) {
				rect = this.dom[0].getBoundingClientRect();
				return rect.bottom - rect.top;
			}
		}
	}

	mornjs.prototype.rect = function() {
		// if (width === undefined) {
			var rect;
			if (this.dom.length !== 0) {
				rect = this.dom[0].getBoundingClientRect();
				return rect;
			}
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
		if (this.dom.length > 0) {
			dom = this.dom[0];
		} else {
			return this;
		}

		if (children.length) {
			for (var i = children.length - 1; i >= 0; i--) {
				dom.appendChild(children[i]);
			}
		} else {
			dom.appendChild(children);
		}
		return this;
	};

	mornjs.prototype.prepend = function(children) {
		var dom;
		if (this.dom.length > 0) {
			dom = this.dom[0];
		} else {
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

	return mornjs;
}());
'use strict';
(function($){

	$.isNode = function(o){
		return (
			typeof Node === "object" ? o instanceof Node :
			o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
		);
	};

	$.isElement = function(o){
		return (
			typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
			o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
		);
	};

}(morn));
'use strict';
/** 
 * This page of code is from the page: http://stackoverflow.com/questions/5916900/detect-version-of-browser
 * To get browser and version
 */

(function ($) {
	$.browser = (function(){
		var ua = navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		if(/trident/i.test(M[1])){
			tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
			return 'IE ' + (tem[1] || '');
		}
		if(M[1] === 'Chrome'){
			tem=ua.match(/\bOPR\/(\d+)/);
			if(tem !== null) {
				return 'Opera '+tem[1];
			}
		}
		M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
		if((tem = ua.match(/version\/(\d+)/i)) !== null) {M.splice(1,1,tem[1]);}
		return {
			browser:M[0], version: M[1]
		};
	}());
}(morn));
'use strict';

(function($){
	var transform = function(element, matrix) {
		this.element = element;
		this.matrix = matrix;
	};

	transform.prototype.rotate = function(degree){
		var degree = 3.1415926 * degree / 180,
			sin = Math.sin(degree),
			cos = Math.cos(degree),
			tMatrix = [
						cos, -sin, 0,
						sin, cos , 0,
						0 , 0, 1
					];
		this.matrix = multiplyBy(this.matrix, tMatrix);
		return this;
	};

	transform.prototype.scale = function(ratio){
		var tMatrix = [
				ratio, 0, 0,
				0, ratio, 0,
				0 , 0, 1
			];
		this.matrix = multiplyBy(this.matrix, tMatrix);
		return this;
	};

	transform.prototype.scaleX = function(ratio){
		var tMatrix = [
				ratio, 0, 0,
				0, 1, 0,
				0 , 0, 1
			];
		this.matrix = multiplyBy(this.matrix, tMatrix);
		return this;
	};

	transform.prototype.scaleY = function(ratio){
		var tMatrix = [
				1, 0, 0,
				0, ratio, 0,
				0 , 0, 1
			];
		this.matrix = multiplyBy(this.matrix, tMatrix);
		return this;
	};

	transform.prototype.translate = function(x ,y){
		var tMatrix = [
				1, 0, x,
				0, 1, y,
				0 , 0, 1
			];
		this.matrix = multiplyBy(this.matrix, tMatrix);
		return this;
	};

	transform.prototype.translateX = function(x){
		var tMatrix = [
				1, 0, x,
				0, 1, 0,
				0 , 0, 1
			];
		this.matrix = multiplyBy(this.matrix, tMatrix);
		return this;
	};

	transform.prototype.translateY = function(y){
		var tMatrix = [
				1, 0, 0,
				0, 1, y,
				0 , 0, 1
			];
		this.matrix = multiplyBy(this.matrix, tMatrix);
		return this;
	};

	transform.prototype.end = function() {
		this.element.dom[0].style.transform = 'matrix(' + this.matrix[0].toFixed(9) + ',' + this.matrix[3].toFixed(9) + ',' + this.matrix[1].toFixed(9) + ',' + this.matrix[4].toFixed(9) + ',' + this.matrix[2].toFixed(9) + ',' + this.matrix[5].toFixed(9) + ')';
		return this.element;
	};

	function multiplyBy(origin, matrix) {
		var i, j, result = new Array(9);
		for (i = 0; i < 3; i++) {
			for (j = 0; j< 3; j++) {
				result[3 * i + j] = origin[3 * i + 0] * matrix[j + 0] +
									origin[3 * i + 1] * matrix[j + 3] +
									origin[3 * i + 2] * matrix[j + 6];
			}
		}
		return result;
	}

	$.prototype.matrix = function() {
		var m = this.getComputedStyle().transform,
			matrix;
		if (m === null || m === 'none') {
			matrix = [
						1, 0, 0,
						0, 1, 0,
						0, 0, 1
					];
		} else {
			var reg = /[-+]?[0-9]*\.?[0-9]+/g,
				result,
				mx = [];
			while ((result = reg.exec(m)) !== null) {
				mx.push(parseFloat(result[0]));
			}
			matrix = [mx[0], mx[2], mx[4], mx[1], mx[3], mx[5], 0, 0, 1];
		}
		return new transform(this, matrix);
	};


}(morn));
'use strict';

(function($) {
	var cacheData = {

	};

	var guid = 0,
		cache = 'morn-js';

	$.prototype.data = (function(){
		if (document.documentElement.dataset) {
			return function(key, value){
				if (value === undefined) {
					return this.dom[0].dataset[key];
				} else {
					for (var i = 0, len = this.dom.length; i < len; i++) {
						this.dom[i].dataset[key] = value;
					}
				}
			};
		} else return function(key, value) {

			if (value === undefined) {
				if (this.dom[0][cache] === undefined){
					return undefined;
				} else {
					var tmp = cacheData[this.dom[0][cache]];
					if (tmp !== undefined) {
						return tmp[key];
					} else {
						return undefined;
					}
				}
			} else {
				for (var i = 0, len = this.dom.length; i < len; i++) {
					if (this.dom[i][cache] === undefined){
						cacheData[guid] = {};
						cacheData[guid][key] = value;
						this.dom[i][cache] = guid++;
					} else {
						cacheData[this.dom[i][cache]][key] = value;
					}
				}
				return this;
			}
		};
	}());


	$.prototype.removeData = (function() {
		if (document.documentElement.dataset) {
			return function(key) {
				var i, len;
				if (key !== undefined) {
					for (i = 0, len = this.dom.length; i < len; i++) {
						delete this.dom[i].dataset[key];
					}
				} else {
					for (i = 0, len = this.dom.length; i < len; i++) {
						for (d in this.dom[i].dataset) {
							delete this.dom[i].dataset[d];
						}
					}
				}
			};
		} else try {
			delete cacheData[''];
			return function(key) {
				var i, len;
				if (key === undefined) {
					for (i = 0, len = this.dom.length; i < len; i++) {
						if (this.dom[i][cache] !== undefined){
							delete cacheData[this.dom[i][cache]];
						}
					}
				} else {
					var tmp;
					for (i = 0, len = this.dom.length; i < len; i++) {
						if (this.dom[i][cache] !== undefined){
							tmp = cacheData[this.dom[i][cache]];
							if (tmp !== undefined) {
								delete cacheData[this.dom[i][cache]];
							}
							delete this.dom[i][cache];
						}
					}
				}

			};
		} catch(e) {
			return function(key) {
				var i, len;
				if (key === undefined) {
					for (i = 0, len = this.dom.length; i < len; i++) {
						if (this.dom[i][cache] !== undefined){
							cacheData.removeAttribute(this.dom[i][cache]);
						}
					}
				} else {
					var tmp;
					for (i = 0, len = this.dom.length; i < len; i++) {
						if (this.dom[i][cache] !== undefined){
							tmp = cacheData[this.dom[i][cache]];
							if (tmp !== undefined) {
								cacheData.removeAttribute(this.dom[i][cache]);
							}
							this.dom[i].removeAttribute(cache);
						}
					}
				}
			};
		}
	}());
}(morn));
'use strict';

var define = (function(){
	var namespaces = {},
		pending = [],
		uid = 0;

	function _load(ns, dependsOn, func){
		var loadNow = true;
		dependsOn.forEach(function(e){
			if (namespaces[e] === undefined) {
				loadNow = false;
			} else {
				if (namespaces[e].load === false) {
					if (!_load(e, e.depends, e.func)) {
						loadNow = false;
					}
				}
			}
		});
		if (loadNow) {
			namespaces[ns].load = true;
			func();
			return true;
		} else {
			return false;
		}
	}

	function guid() {
		return uid++;
	}

	return function(ns, dependsOn, func) {
		if (ns === null) {
			ns = guid();
		}
		namespaces[ns] = {
			load: false,
			depends: dependsOn,
			func: func
		};
		_load(ns, dependsOn, func);
	};
}());
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
}(morn));
'use strict';

(function($) {

    function Stream(text) {
        this.number = 0;
        this.pos = 0;
        this.seletor = text;
    }

    Stream.EOL = -1;

    Stream.prototype.read = function() {
        if (this.pos < this.seletor.length) {
            return this.seletor.charAt(this.pos++);
        } else {
        	this.pos++;
            return Stream.EOL;
        }
    };

    Stream.prototype.putBack = function() {
        if (this.pos === 0) {
        } else {
            this.pos--;
        }
    };

    Stream.prototype.pick = function() {
		if (this.pos < this.seletor.length) {
			return this.seletor.charAt(this.pos);
		} else {
			return Stream.EOL;
		}
	};

	Stream.prototype.match = function(matchString) {
		return this.seletor.indexOf(matchString, this.pos) === this.pos;
	};

	var type = {};

	type.inRange = function (num, min, max) {
		return (num >= min && num <= max);
	};

	type.isNum = function(c) {
		return (type.inRange(c, '0', '9'));
	};

	type.isAlpha = function(c) {
		return (type.inRange(c, 'a', 'z') || type.inRange(c, 'A', 'Z'));
	};

	type.isWhite = function(c) {
		return (c === '\t' || c === ' ');
	};

	var Token = {
		WHITE         : 0,
		ID            : 1,
		CLASS         : 2,
		TAG           : 3,
		ALL           : 4,
		FAKE          : 5,
		UNKNOWN       : 8
	};

	var State = {
		INSTART: 0,
		INWHITE: 1,
		INID:    2,
		INCLASS: 3,
		INTAG:   4,
		INFAKECLASS:5,
		DONE:    16
	};

	function States(startup) {
		this.states = [startup];
	}

	States.prototype.push = function(state) {
		this.states.push(state);
	};

	States.prototype.change = function(state) {
		this.states.pop();
		this.states.push(state);
	};

	States.prototype.pop = function() {
		return this.states.pop();
	};

	States.prototype.top = function() {
		return this.states[this.states.length - 1];
	};

	/*
	*
	*	scan seletor string and match doms
	*
	*/
	$.parseSelector = function (seletor, scope) {
		var currentToken = null,
			tokens       = [],
			c            = '',
			buffer       = '',
			state        = new States(State.START),
			save         = true,
			_saveToken   = false,
			stream       = new Stream(seletor);

		function addToken (buffer, token) {
			tokens.push({text: buffer, type: token});
			_saveToken = false;
		}

		function saveToken(token) {
			currentToken = token;
			_saveToken = true;
		}

		function putBack(){
			stream.putBack();
			save = false;
		}

		while (state.top() !== State.DONE) {

			c = stream.read();
			save = true;
			switch (state.top()) {

				case State.START:
					if (type.isAlpha(c)) {
						state.push(State.INTAG);
					} else if (c === '.') {
						save = false;
						state.push(State.INCLASS);
					} else if (c === '#') {
						save = false;
						state.push(State.INID);
					} else if (c === '*') {
						saveToken(Token.ALL);
					} else if (type.isWhite(c)) {
						state.change(State.INWHITE);
					} else if (c === Stream.EOL) {
						state.change(State.DONE);
					} else if (c === ':') {
						save = false;
						state.push(State.INFAKECLASS);
					}
					break;

				case State.INTAG:
					if (!type.isAlpha(c) && !type.isNum(c)) {
						putBack();
						saveToken(Token.TAG);
						state.pop();
					}
					break;

				case State.INCLASS:
					if (!type.isAlpha(c) && !type.isNum(c) && c !== '-') {
						putBack();
						saveToken(Token.CLASS);
						state.pop();
					}
					break;

				case State.INID:
					if (!type.isAlpha(c) && !type.isNum(c)) {
						putBack();
						saveToken(Token.ID);
						state.pop();
					}
					break;

				case State.INWHITE:
					if (!type.isWhite(c)) {
						putBack();
						saveToken(Token.WHITE);
						state.pop();
					}
					save = false;
					break;

				case State.INFAKECLASS:
					if (!type.isAlpha(c)) {
						putBack();
						saveToken(Token.FAKE);
						state.pop();
					}
				default :
					//never reaches here;
			}

			if (save === true) {
				buffer += c;
			}

			if (_saveToken) {
				addToken(buffer, currentToken);
				if (tokens.length > 100) {
					return analyse(tokens);
				}
				buffer = '';
			}
		}

		return analyse(tokens, scope);
	};


	function analyse (tokens, scope) {
		var lastId = 0,
			result = null,
			lastResult = scope || null;

		// for (var i = tokens.length - 1; i >= 0; i--) {
		// 	if (tokens[i].type === Token.ID) {
		// 		lastId = i;
		// 		break;
		// 	}
		// }

		//for (var len = tokens.length, i = lastId; i < len; i++) {
		
		for (var len = tokens.length, i = 0; i < len; i++) {
			switch(tokens[i].type) {
				case Token.WHITE:
					break;

				case Token.ID:
					result = [$.id(tokens[i].text)];
					break;

				case Token.CLASS:
					if (lastResult !== null) {
						result = [];
						if (tokens[i - 1].type !== Token.WHITE) {
							for (var iter = 0, resultlen = lastResult.length; iter < resultlen; iter++) {
								if ($.hasClass(lastResult[iter], tokens[i - 1].text)) {
									result.push(lastResult[iter]);
								}
							}
						} else {
							for (var iter = 0, resultlen = lastResult.length; iter < resultlen; iter++) {
								var tmp = $.classStyle(tokens[i].text, lastResult[iter]);
								for (var index = 0, l = tmp.length; index < l; index++) {
									result.push(tmp[index]);
								}
							}
						}
					} else {
						result = $.classStyle(tokens[i].text);
					}
					lastResult = result;
					break;

				case Token.TAG:
					if (lastResult !== null) {
						result = [];
						for (var iter = 0, resultlen = lastResult.length; iter < resultlen; iter++) {
							var tmp = $.tag(tokens[i].text, lastResult[iter]);
							for (var index = 0, l = tmp.length; index < l; index++) {
								result.push(tmp[index]);
							}
						}
					} else {
						result = $.tag(tokens[i].text);
					}
					lastResult = result;
					break;

				case Token.FAKE:
					if (lastResult !== null) {
						var fake = tokens[i].text;

						if (fake === 'odd') {

							result = [];
							for (var iter = 0, resultlen = lastResult.length; iter < resultlen; iter++) {
								if (iter % 2 === 0) {
									result.push(lastResult[iter]);
								}
							}

						} else if (fake === 'even') {
							result = [];
							for (var iter = 0, resultlen = lastResult.length; iter < resultlen; iter++) {
								if (iter % 2 === 1) {
									result.push(lastResult[iter]);
								}
							}

						} else if (fake === 'first-child') {
								result = [lastResult[0]];

						} else if (fake === 'last-child') {
								result = [lastResult[lastResult.length - 1]];
						}
					} else {
						result = [];
					}

					lastResult = result;
					break;
				default:
			}
		}

		return result;

	}
}(morn));
'use strict';

(function($) {
	var RESOLVED = 0,
		REJECTED = 1,
		PENDING  = 2;

	function emptyFunc() { }

	$.promise = function() {
		return new $.promise.prototype.init();
	};

	$.promise.prototype.init = function() {
		this.status = PENDING;
		this.error = undefined;
		this.callbacks = [];
		this.catchs = [];
		this.result = undefined;
	};

	$.promise.prototype.init.prototype = $.promise.prototype;

	$.promise.prototype.then = function(success, failed) {
		this.callbacks.push(function (value) {
			if (this.status === PENDING) {
				try {
					return success(value);
				} catch (e) {
					this.error = e;
					this.status = REJECTED;
					if (failed) {
						failed(e);
					}
					for (var j = 0, len = this.catchs.length; j < len; j++) {
						this.catchs[j].call(this, e);
					}
					return;
				}
			} else if (this.status === REJECTED) {
				if (failed) {
					failed(this.error);
				}
			}
		});

		if (this.status === RESOLVED) {
			success(this.result);
		} else if (this.status === REJECTED) {
			if (failed) {
				failed(this.error);
			}
		}
		return this;
	};

	$.promise.prototype.resolve = function(result) {
		this.result = result;
		this._complete(result);
		return this;
	};

	$.promise.prototype.reject = function(err) {
		this.status = REJECTED;
		this.error = err;
		this._complete(null);
		return this;
	};

	$.promise.prototype.catch = function(func) {
		if (this.status === REJECTED) {
			func.call(this, this.error);
		} else {
			this.catchs.push(func);
		}
	};

	$.promise.prototype._complete = function(result) {
		var i = 0, func, p;
		while (func = this.callbacks[i++]) {
			if (this.status === PENDING) {
				p = func.call(this, result);
				if (p !== undefined && p.constructor === $.promise) {
					p.callbacks = this.callbacks.slice(i);
					p.result = this.result;
					this.callbacks.length = 0;
				}
			}
		}
		this.catchs.length = 0;
		this.status = RESOLVED;
	};
}(morn));
'use strict';

(function($){
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

	$.prototype.find = function(selector) {
		if (selector) {
			return new $.prototype.init($.parseSelector(selector), this.dom);
		}
	};

	$.prototype.get = function(index) {
		return this.dom[index];
	};

	$.prototype.forEach = function(func) {
		for (var i = 0, len = this.dom.length; i < len; i++) {
			func.call(this.dom[i], this.dom[i], i);
		}
	};

	$.prototype.parent = function() {
		return $(this.dom[0].parentElement);
	};
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
	$.widget.prototype.resize = function (opt) {
		var options       = opt || {};
		options.maxHeight = options.maxHeight || null;
		options.minHeight = options.minHeight || null;
		options.maxWidth  = options.maxWidth || null;
		options.minWidth  = options.minWidth || null;
		options.direction = options.direction || 'all';
		options.border    = options.border || [true, true, true, true];
		options.corner    = options.corner || [true, true, true, true];
		var element       = this.dom[0];

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
		$(element).append(controller);
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
		$(element).append(controller);
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
'use strict';

(function($) {
	$.widget.prototype.sticky = function(opt) {
		var option = opt || {};
			option.topOffset = option.scrollTop || 0;
		var element = this.dom[0],
			elementTop = $(element).rect().top,
			offset = option.topOffset + elementTop,
			isSticky = false,
			originalPostion = $(element).getComputedStyle('position');
		$(window).addEventHandler('scroll', function(){
			if (document.body.scrollTop > offset) {
				if (!isSticky) {
					element.style.position = 'fixed';
					element.style.top = option.topOffset + 'px';
					isSticky = true;
				}
			} else {
				if (isSticky) {
					element.style.top = elementTop;
					element.style.position = originalPostion;
					isSticky = false;
				}
			}
		});
	};
}(morn));