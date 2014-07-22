'use strict';

var morn = (function(){

	var mornjs = function(selector, context) {
		if (selector !== undefined ) {
			if (typeof selector === 'string') {
				return new mornjs.prototype.init(mornjs.parseSelector(selector));
			} else if (selector.nodeType !== undefined || selector.length !== undefined) {
				return new mornjs.prototype.init(selector);
			} else if (selector.constructor === mornjs){
				return selector;
			}
		}

	};

	mornjs.prototype.init = mornjs.widget = function(dom) {
		this.dom = dom;
		return this;
	};

	mornjs.prototype.init.prototype = mornjs.prototype;
	
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
	};

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

	return mornjs;
}());