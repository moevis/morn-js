'use strict';

(function($) {
	var RESOLVED = 0,
		REJECTED = 1,
		WAITING  = 2;

	function emptyFunc() {

	}

	$.promise = function() {
		return new $.promise.prototype.init();
	};

	$.promise.prototype.init = function() {
		this.callbacks = [];
		this.next = undefined;
	};

	$.promise.prototype.init.prototype = $.promise.prototype;

	$.promise.prototype.then = function(func) {
		if (func.constructor === $.promise) {
			this.next = func;
			return func;
		} else {
			this.callbacks.push(func);
			return this;
		}
	};

	$.promise.prototype.resolve = function(value) {
		this._complete(value);
	};

	$.promise.prototype.reject = function() {
	};

	$.promise.prototype._complete = function(value) {
		var i = 0, func;
		while (func = this.callbacks[i++]) {
			value = func(value);
		}
		// if (this.next !== undefined) {
		// 	this.next.resolve();
		// };
	};
}(morn));
function delay(ms) {
	var p = morn.promise();
	setTimeout(function(){
		p.resolve();
	}, ms);
	return p;
}

