'use strict';

(function($) {
	var RESOLVED = 0,
		REJECTED = 1,
		WAITING  = 2;

	function emptyFunc() { }

	$.promise = function() {
		return new $.promise.prototype.init();
	};

	$.promise.prototype.init = function() {
		this.status = WAITING;
		this.error = undefined;
		this.callbacks = [];
		this.catch = undefined;
		this.result = undefined;
	};

	$.promise.prototype.init.prototype = $.promise.prototype;

	$.promise.prototype.then = function(success, failed) {
		this.callbacks.push(function (value) {
			if (this.status === WAITING) {
				try {
					return success(value);
				} catch (e) {
					this.status = RESOLVED;
					if (failed) {
						return failed(e);
					}
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

	$.promise.prototype._complete = function(result) {
		var i = 0, func, p;
		if (this.status === REJECTED) {

		}
		while (func = this.callbacks[i++]) {
			if (this.status === WAITING) {
				try {
					p = func.call(this, result);
					if (p !== undefined && p.constructor === $.promise) {
						p.callbacks = this.callbacks.slice(i);
						p.result = this.result;
						this.callbacks.length = 0;
					}
				} catch(e) {
					this.error = e;
					this.status = REJECTED;
					func.call(this, e);
					break;
				}
			}
		}
		this.status = RESOLVED;
	};
}(morn));