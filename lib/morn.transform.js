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

	transform.prototype.end = function() {
		this.element.dom[0].style.transform = 'matrix(' + this.matrix[0] + ',' + this.matrix[3] + ',' + this.matrix[1] + ',' + this.matrix[4] + ',' + this.matrix[2] + ',' + this.matrix[5] + ')';
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
			var degree = 3.1415926 * 30 / 180,
			sin = Math.sin(degree),
			cos = Math.cos(degree);
	console.log(multiplyBy([1, 0, 0, 0, 1, 0, 0, 0, 1], [cos, -sin, 0, sin, cos , 0, 0 , 0, 1]));

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