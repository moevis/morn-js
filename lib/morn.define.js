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