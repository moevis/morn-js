'use strict';

(function($) {

    function Stream(text) {
        this.number = 0;
        this.pos = 0;
        this.seletor = text;
    };

    Stream.EOL = -1;

    Stream.prototype.read = function() {
        if (this.pos < this.seletor.length) {
            return this.seletor.charAt(this.pos++);
        } else {
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
		UNKNOWN       : 8
	};

	var State = {
		INSTART: 0,
		INWHITE: 1,
		INID:    2,
		INCLASS: 3,
		INTAG:   4,
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
	$.parseSelector = function (seletor) {
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
						state.push(State.INCLASS);
					} else if (c === '#') {
						state.push(State.INID);
					} else if (c === '*') {
						saveToken(Token.ALL);
					} else if (type.isWhite(c)) {
						state.change(State.INWHITE);
					} else if (c === Stream.EOL) {
						putBack();
						state.change(State.DONE);
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
					if (!type.isAlpha(c) && !type.isNum(c)) {
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
					break;
				default :
					//never reaches here;
			}

			if (save === true) {
				buffer += c;
				if (buffer.length > 100) {
					return tokens;
				}
			}

			if (_saveToken) {
				addToken(buffer, currentToken);
				if (tokens.length > 1000) {
					console.log('bug');
					return tokens;
				}
				buffer = '';
			}
		}

		return tokens;
	};

}(morn));