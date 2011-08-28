# keymaster.js

`keymaster.js` is a simple (~60 LoC) micro-library for defining and 
dispatching keyboard shortcuts. It has no dependencies.

It’s a work in progress, so spare me your nerdrage and instead
contribute! Patches are welcome, but they are not guaranteed to make
it in.

Two global methods are exposed, `key` for defining shortcuts, and
`keyScope` for switching scope.

See `test.html` for a live demo.

```javascript
key('c', 'issues', function(){
 console.log('c/issues');
});

key('command+r', 'issues', function(){
  console.log('Hijacked Command+R, damn!');
  return false;
});

key('i', function(){
  keyScope('issues');
  console.log('Switched to "issues" scope. Command+R is now no longer reloading...');
});

key('i', function(){
  console.log('(example of multiple assignment)');
});

key('i', { id: "TextArea" }, function(){
  console.log('You pressed i in TextArea');
});

key('i', { id: "TextArea", scope: "issues" }, function(){
  keyScope('issues');
  console.log('You pressed i in TextArea with "issues" scope');
});

key('t', { tagName: "TEXTAREA" }, function(){
  console.log('You pressed t in <textarea/>');
});

key('o, enter, left', function(){
  console.log('o, enter or left pressed!');
});

key('ctrl+c', function(){
  console.log('this is not the command line');
});

key('⌘+right,shift+left,ctrl+shift+alt+d', function(event){
  console.log('command+right, or shift+left, or ctrl+shift+alt+d');
  console.log('here is the event: ', event);
  return false; // prevent default && stop propagation
});
```

## TODO
 
* Make behavior with `INPUT` / `SELECT` / `TEXTAREA` configurable
* Comprehensive test suite
* Make it work on IE (7+) (low priority)

`keymaster.js` is (c) 2011 Thomas Fuchs and may be freely distributed under the MIT license.
See the `MIT-LICENSE` file.
