test('mornjs.lexer.js', function() {

	var tokens = morn.parseSelector('tag .class #id *');

	equal(tokens.length, 7, 'right tokens');
	
});