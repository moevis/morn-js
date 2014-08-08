'use strict';

define('lexer', ['core', 'selector', 'dom'], function($) {

    function Stream(text) {
        this.number = 0;
        this.pos = 0;
        this.seletor = text;
    }

    Stream.EOL = -1;

    Stream.prototype.read = function() {
        if (this.pos < this.seletor.length) {
            return this.seletor.charAt(this.pos++);
        } else {
        	this.pos++;
            return Stream.EOL;
        }
    };

    Stream.prototype.putBack = function() {
        if (this.pos !== 0) {
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

	Stream.prototype.eatWhite = function() {
		while (this.pick() === ' ') {
			this.read();
		}
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
		FAKE          : 5,
        SLIBING       : 6,
        CHILDREN      : 7,
		UNKNOWN       : 8
	};

	var State = {
		START: 0,
		INWHITE: 1,
		INID:    2,
		INCLASS: 3,
		INTAG:   4,
		INFAKECLASS:5,
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

	$.parse = function (selector) {
		var currentToken = null,
			tokens       = [],
			c            = '',
			buffer       = '',
			state        = new States(State.START),
			save         = true,
			_saveToken   = false,
			stream       = new Stream(selector);

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
						save = false;
						state.push(State.INCLASS);
					} else if (c === '#') {
						save = false;
						state.push(State.INID);
					} else if (c === '*') {
						saveToken(Token.ALL);
					} else if (type.isWhite(c)) {
						state.push(State.INWHITE);
                    } else if (c === '>') {
						save = false;
						stream.eatWhite();
                        saveToken(Token.CHILDREN);
                    } else if (c === '~') {
						save = false;
						stream.eatWhite();
                        saveToken(Token.SLIBING);
                    } else if (c === Stream.EOL) {
						state.change(State.DONE);
					} else if (c === ':') {
						save = false;
						stream.eatWhite();
						state.push(State.INFAKECLASS);
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
					if (!type.isAlpha(c) && !type.isNum(c) && c !== '-') {
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
					save = false;
					break;

				case State.INFAKECLASS:
					if (!type.isAlpha(c)) {
						putBack();
						saveToken(Token.FAKE);
						state.pop();
					}
                    break;
				default:
                    break;
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
				if (tokens.length > 100) {
					return $.analyse(tokens);
				}
				buffer = '';
			}
		}

		return tokens;
	};
	/*
	*
	*	scan seletor string and match doms
	*
	*/
	$.parseSelector = function (selector, scope) {
		return $.analyse($.parse(selector), scope);
	};


    $.analyse = function(tokens, scope) {
        var tmp,
            result = null,
			lastResult = scope || null,
			doWithCurrent = false,
			iter,
			resultlen;

		for (var len = tokens.length, i = 0; i < len; i++) {
			switch(tokens[i].type) {
				case Token.WHITE:
					doWithCurrent = false;
					break;

				case Token.ID:
					if (doWithCurrent === true) {
						for (iter = 0, resultlen = lastResult.length; iter < resultlen; iter++) {
							if (lastResult[iter].id === tokens[i].text) {
								result = [lastResult[iter]];
								break;
							}
						}
					} else {
						result = [$.id(tokens[i].text, scope)];
					}
					doWithCurrent = true;
					break;

				case Token.CLASS:
					if (lastResult !== null) {
						result = [];
						if (doWithCurrent === true) {
							for (iter = 0, resultlen = lastResult.length; iter < resultlen; iter++) {
								if ($.hasClass(lastResult[iter], tokens[i - 1].text)) {
									result.push(lastResult[iter]);
								}
							}
						} else {
							for (iter = 0, resultlen = lastResult.length; iter < resultlen; iter++) {
                                tmp = $.classStyle(tokens[i].text, lastResult[iter]);
								for (var index = 0, l = tmp.length; index < l; index++) {
									result.push(tmp[index]);
								}
							}
						}
					} else {
						result = $.classStyle(tokens[i].text);
					}
					doWithCurrent = true;
					break;

				case Token.TAG:
					if (lastResult !== null) {
						result = [];
						if (doWithCurrent === true) {
							for (iter = 0, resultlen = lastResult.length; iter < resultlen; iter++) {
								if (lastResult[iter].tagName.toLowerCase() === tokens[i].text) {
									result.push(lastResult[iter]);
								}
							}
						} else {
							for (iter = 0, resultlen = lastResult.length; iter < resultlen; iter++) {
								tmp = $.tag(tokens[i].text, lastResult[iter]);
								for (var index = 0, l = tmp.length; index < l; index++) {
									result.push(tmp[index]);
								}
							}
						}

					} else {
						result = $.tag(tokens[i].text);
					}
					doWithCurrent = true;
					break;

                case Token.SLIBING:
                    if (lastResult !== null) {
                        var existNode = [],
                            node,
                            nodeIndex,
                            existNodeLen,
                            slibings = [];

                        for (iter = 0, resultlen = lastResult.length; iter < resultlen; iter++) {
                            if (! existIn(lastResult[iter].parentElement, existNode)) {
                                existNode.push(lastResult[iter].parentElement);
                                slibings = slibings.concat(Array.prototype.slice.call(lastResult[iter].parentElement.children, 0));
                            }
                        }
                        result = slibings;
                        doWithCurrent = true;
                    } else {
                        result = [];
                    }
                    break;

                case Token.CHILDREN:
                    if (lastResult !== null) {
                        result = [];

                        for (iter = 0, resultlen = lastResult.length; iter < resultlen; iter++) {
                            result = result.concat(Array.prototype.slice.call(lastResult[iter].children, 0));
                        }

                        doWithCurrent = true;
                    } else {
                        result = [];
                    }
                    break;

				case Token.FAKE:
					if (lastResult !== null) {
						var fake = tokens[i].text;

						if (fake === 'odd') {

							result = [];
							for (iter = 0, resultlen = lastResult.length; iter < resultlen; iter++) {
								if (iter % 2 === 0) {
									result.push(lastResult[iter]);
								}
							}

						} else if (fake === 'even') {
							result = [];
							for (iter = 0, resultlen = lastResult.length; iter < resultlen; iter++) {
								if (iter % 2 === 1) {
									result.push(lastResult[iter]);
								}
							}

						} else if (fake === 'first-child') {
								result = [lastResult[0]];

						} else if (fake === 'last-child') {
								result = [lastResult[lastResult.length - 1]];
						}

					} else {
						result = [];
					}
					break;
				default:
			}

            if (result.length === 0 && lastResult !== null) {
                return result;
            }

			lastResult = result;

		}

		return result;
	};

    function existIn(node, nodelist) {
        for (var nodeIndex = 0, existNodeLen = nodelist.length; nodeIndex < existNodeLen; nodeIndex++) {
            if (nodelist[nodeIndex] === node) {
                return true;
            }
        }
        return false;
    }
});