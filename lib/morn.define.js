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

	function searchInPending(ns) {

		return false;
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