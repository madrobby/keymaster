# keymaster.js

Keymaster is a simple (~60 LoC) micro-library for defining and 
dispatching keyboard shortcuts. It has no dependencies.

*It’s a work in progress (e.g. beta), so spare me your nerdrage and instead
contribute! Patches are welcome, but they are not guaranteed to make
it in.*

One global method is exposed, `key` which defines shortcuts when
called directly. Use `key.setScope` for switching scope.

At any point in time (even in code other than key shortcut handlers),
you can query the `key` object for the state of modifier keys. This
allows easy implementation of things like shift+click handlers. For example, 
`key.shift` is `true` if the shift key is currently pressed.

Keymaster understands the following modifiers:
`shift`, `option`, `⌥`, `alt`, `ctrl`, `control`, `command`, and `⌘`.

When an `INPUT`, `SELECT` or `TEXTAREA` element is focussed, Keymaster
doens't process shortcuts.

```javascript
// define short of 'a'
key('a', function(){ alert('you pressed a!') });

// returning false stops the event and prevents default browser events
key('ctrl+r', function(){ alert('stopped reload!'); return false });

// multiple shortcuts
key('command+r, ctrl+r', function(){ });

// shortcut with a scope
key('o, enter', 'issues', function(){ /* do something */ });
key('o, enter', 'files', function(){ /* do something else */ });
key.setScope('issues'); // default scope is 'all'

// query modifier keys
if(key.shift) alert('shift is pressed, OMGZ!');
```

Keymaster should work with any browser that fires `keyup` and `keydown` events, 
and is tested with IE (6+), Safari, Firefox and Chrome.

See `test.html` for a live demo.

```javascript
key('c', 'issues', function(){
 console.log('c/issues');
});

key('command+r, ctrl+r', 'issues', function(){
  console.log('Hijacked Command+R or Ctrl+R, damn!');
  return false;
});

key('i', function(){
  key.setScope('issues');
  console.log('Switched to "issues" scope. Command+R or Ctrl+R is now no longer reloading...');
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
  console.log('here is the event: ', event);
  console.log('key.control', key.control);
  console.log('key.ctrl', key.ctrl);
  console.log('key.shift', key.shift);
  console.log('key.alt', key.alt);
  console.log('key["⌘"]', key["⌘"]);
  return false; // prevent default & stop propagation
});
```

## TODO
 
* Make behavior with `INPUT` / `SELECT` / `TEXTAREA` configurable
* Comprehensive test suite

Keymaster is (c) 2011 Thomas Fuchs and may be freely distributed under the MIT license.
See the `MIT-LICENSE` file.
