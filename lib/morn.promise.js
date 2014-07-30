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