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
`⇧`, `shift`, `option`, `⌥`, `alt`, `ctrl`, `control`, `command`, and `⌘`.

The following special keys can be used for shortcuts:
`backspace`, `tab`, `clear`, `enter`, `return`, `esc`, `escape`, `space`,
`up`, `down`, `left`, `right`, `home`, `end`, `pageup`, `pagedown`, `del`, `delete`
and `f1` through `f19`.

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

See [http://madrobby.github.com/keymaster/](http://madrobby.github.com/keymaster/) for a live demo.

If you're using CoffeeScript, configuring key shortcuts couldn't be simpler:

```coffeescript
key 'a', -> alert('you pressed a!')

key '⌘+r, ctrl+r', ->
  alert 'stopped reload!'
  off

key 'o, enter', 'issues', ->
  whatevs()

alert 'shift is pressed, OMGZ!' if key.shift
```

The handler method is called with two arguments set, the keydown `event` fired, and
an object containing, among others, the following two properties:

`shortcut`: a string that contains the shortcut used, e.g. `ctrl+r`
`scope`: a string describing the scope (or `all`)

```javascript
key('⌘+r, ctrl+r', function(event, handler){
  console.log(handler.shortcut, handler.scope);
});

// "ctrl+r", "all"
```

## Ender support

Add `keymaster` as a top level method to your [Ender](http://ender.no.de) compilation.

    $ ender add keymaster

Use it:

``` js
$.key(''⌘+r', function () {
  alert('reload!')
})
```

## TODO

* Make behavior with `INPUT` / `SELECT` / `TEXTAREA` configurable
* Comprehensive test suite

Keymaster is (c) 2011 Thomas Fuchs and may be freely distributed under the MIT license.
See the `MIT-LICENSE` file.
