keymaster.js is a simple (<50 LoC) micro-library for defining and 
dispatching keyboard shortcuts. It has no dependencies.

It's a work in progress, so spare me your nerdrage but instead
contribute! Patches are welcome, but they are not guaranteed to make
it in.

Two global methods are exposed, `key` for defining shortcuts, and
`keyScope` for switching scope.

See `test.html` for a live demo.

```
  key('c', 'issues', function(){
    console.log('c/issues');
  });
    
  key('i', function(){
    keyScope('issues');
    console.log('Switched to "issues" scope.');
  });
  
  key('i', function(){
    console.log('(example of multiple assignment)');
  });
  
  key('o, enter, left', function(){
    console.log('o, enter or left pressed!');
  });

  key('ctrl+c', function(){
    console.log('this is not the command line');
  });

  key('⌘+right,shift+left,ctrl+shift+alt+d', function(event){
    console.log('command+right, or shift+left, or ctrl+shift+alt+d');
    event.preventDefault();
  });
```

TODOs:
 
  * Make it work on IE (7+) 
  * Add a way to easily cancel propagation/default behavior
  * Make behavior with INPUT/SELECT/TEXTAREA configurable
  * Comprehensive test suite

keymaster.js is (c) 2011 Thomas Fuchs and may be freely distributed under the MIT license.
See the `MIT-LICENSE` file.
