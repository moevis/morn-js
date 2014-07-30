morn-js
=======

This is a javascript toolkit library.

It has some useful functions. For example:

* chain your functions.
  * morn('.class').addClass('class').removeEventHandler('click', function).forEach(function(element,i)).
* selector 
  * morn.id('id'), morn.tag('tagname'), or morn('#id') , morn('.class').
  * morn('tag:odd'), morn('tag:even'), morn('tag:first-child'), morn('tag:last-child').
* event add and remove.
  * morn('#id').addEventHandler('click', function(e){ })
  * morn.ready(function) // invoked when document is ready
* style change
  * morn('#id').addClass('classname');
  * morn('#id').getComputedStyle([stylename]);
  * morn('#id').width()
* create dom, append, prepend.
* save your data in dom.
  * choose data-* or morn-js according to the browser to save data.
  * morn('dom').data('id', 10) // save data
  * morn('dom').data('id')     // get data
  * morn('dom').removeData('id') // remove id
  * morn('dom').removeData()   // remove all data
* promise for async function
  * morn.promise().then(success, failed).reject(value).catch(handleError);

and even more.

some ui plugins:

* resize
* sticky

I will continue working on it.
