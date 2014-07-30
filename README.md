morn-js
=======

This is a javascript toolkit library.

It has some useful functions. For example:

* chain function.
* selector 
  * morn.id('id'), morn.tag('tagname'), or morn('#id') , morn('.class').
  * morn('tag:odd'), morn('tag:even'), morn('tag:first-child'), morn('tag:last-child').
* event add and remove.
  * morn('#id').addEventHandler('click', function(e){ })
* style change
  * morn('#id').addClass('classname');
  * morn('#id').getComputedStyle([stylename]);
  * morn('#id').width()
* create dom, append, prepend.
* promise for async function
  * morn.promise().then(success, failed).reject(value);

and even more.

some ui plugins:

* resize
* sticky

I will continue working on it.
