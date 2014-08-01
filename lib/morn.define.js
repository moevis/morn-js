'use strict';

var define = (function(){
	var namespaces = {},
		pending = {},
		uid = 0;

	function _load(ns, dependsOn, func){
		if (namespaces[ns] !== undefined && namespaces[ns].load === true) {
			return true;
		}
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
			var n;
			func();
			namespaces[ns].load = true;
			delete pending[ns];
			for (n in pending) {
				_load(n, namespaces[n].depends, namespaces[n].func);
			}
			return true;
		} else {
			pending[ns] = true;
			return false;
		}
	}

	function guid() {
		return uid++;
	}

	return function() {
		if (arguments.length === 1) {
			arguments[0]();
		} else if (arguments.length === 2){
			var ns;
			if (typeof arguments[0] === 'string') {
				ns = arguments[0];
				namespaces[ns] = {
					load: false,
					depends: [],
					func: arguments[1]
				};
				_load(ns, [], arguments[1]);
			} else {
				ns = guid();
				namespaces[ns] = {
					load: false,
					depends: arguments[0],
					func: arguments[1]
				};
				_load(ns, arguments[0], arguments[1]);
			}
		} else if (arguments.length === 3){
			var ns = arguments[0];
			namespaces[ns] = {
				load: false,
				depends: arguments[1],
				func: arguments[2]
			};
			_load(ns, arguments[1], arguments[2]);
		}

	};
}());