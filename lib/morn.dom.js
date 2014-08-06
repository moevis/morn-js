'use strict';

define('dom', ['core', 'selector'], function($) {

	$.prototype.addClass = (function () {
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

	$.prototype.hasClass = (function () {
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

	$.hasClass = (function () {
		if (document.documentElement.classList) {
			return function (ele, classStyle) {
				if (m$isNode(ele)) {
					return ele.classList.contains(classStyle);
				}
				return false;
			};
		}else{
			return function (ele, classStyle) {
				if (m$isNode(ele)) {
					var c = ' ' + ele.className + ' ';
					return (c.indexOf(' ' + classStyle + ' ') !== -1);
				}
				return false;
			};
		}
	}());

	$.addClass = (function () {
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

	$.prototype.removeClass = (function () {
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

	$.removeClass = (function () {
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

	$.prototype.getComputedStyle = function(name) {
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

	$.getComputedStyle = function( elem, name ) {
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

	$.prototype.width = function(width) {
		if (width === undefined) {
			var rect;
			if (this.dom.length > 0) {
				rect = this.dom[0].getBoundingClientRect();
				return rect.right - rect.left;
			}
		}
	}

	$.prototype.height = function(height) {
		if (height === undefined) {
			var rect;
			if (this.dom.length !== 0) {
				rect = this.dom[0].getBoundingClientRect();
				return rect.bottom - rect.top;
			}
		}
	}

	$.prototype.rect = function() {
		// if (width === undefined) {
			var rect;
			if (this.dom.length !== 0) {
				rect = this.dom[0].getBoundingClientRect();
				return rect;
			}
		// }
	}

	$.createDom = function(str){
		var tmpNodes = [],
			tmp = document.createElement('div');
		tmp.innerHTML = str;
		for (var i = 0, len = tmp.children.length; i < len; i++) {
			tmpNodes.push(tmp.children[i]);
		}
		return tmpNodes;
	};

	$.prototype.append = function(children) {
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

	$.prototype.prepend = function(children) {
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

	$.prototype.hide = function() {
		for (var i = 0; i < this.dom.length; i++) {
			this.dom[i].style.display = 'none';
		}
		return this;
	};

	$.prototype.show = function() {
		for (var i = 0; i < this.dom.length; i++) {
			this.dom[i].style.display = 'block';
		}
		return this;
	};

	$.prototype.next = function() {
		var dom = [],
			next;
		if (document.documentElement.previousSibling !== undefined) {
			for (var len = this.dom.length, i = 0; i < len; i++) {
				if (next = this.dom[i].nextElementSibling) {
					dom.push(this.dom[i].nextElementSibling);
				}
			}
		} else {
			for (var len = this.dom.length, i = 0; i < len; i++) {
				next = this.dom[i].nextSibling;
				while(next && next.nodeType !== 1) {
					next = next.nextSibling;
				}
				if (next && next.nodeType !== 1) {
					dom.push(next);
				}
			}
		}

		this.dom = dom;
		return this;
	};

	$.prototype.prev = function() {
		var dom = [],
			prev;
		if (document.documentElement.previousSibling !== undefined) {
			for (var len = this.dom.length, i = 0; i < len; i++) {
				if (prev = this.dom[i].previousElementSibling) {
					dom.push(this.dom[i].previousElementSibling);
				}
			}
		} else {
			for (var len = this.dom.length, i = 0; i < len; i++) {
				prev = this.dom[i].nextSibling;
				while(prev && prev.nodeType !== 1) {
					prev = prev.previousSibling;
				}
				if (prev && prev.nodeType !== 1) {
					dom.push(prev);
				}
			}
		}
		this.dom = dom;
		return this;
	};

	$.prototype.remove = function() {
		for (var i = 0; i < this.dom.length; i++) {
			this.dom[i].parentElement.removeChild(this.dom[i]);
		}
	};

	$.prototype.count = function() {
		return this.dom.length;
	};

	$.prototype.children = function(i) {
		if (i !== undefined) {
			if (typeof i === 'string') {
				return $.parseSelecor(i, this.dom[0]);
			} else {
				return $(this.get(i));
			}
		} else {
			if (this.dom[0] !== undefined) {
				return $(this.dom[0].children);
			} else {
				return undefined;
			}
		}
	};

	$.prototype.get = function(index) {
		return this.dom[index];
	};

	$.prototype.el = function(index) {
		return $(this.dom[index]);
	};

	$.prototype.forEach = function(func) {
		for (var i = 0, len = this.dom.length; i < len; i++) {
			func.call(this.dom[i], this.dom[i], i);
		}
	};

	$.prototype.parent = function() {
		return $(this.dom[0].parentElement);
	};
});