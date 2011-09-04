# keymaster.js

Keymaster is a simple (100 LoC or so) micro-library for defining and
dispatching keyboard shortcuts. It has no dependencies.

*It’s a work in progress (e.g. beta), so spare me your nerdrage and instead
contribute! Patches are welcome, but they are not guaranteed to make
it in.*

## Usage

Include `keymaster.min.js` in your web app, by loading it as usual:

```html
<script src="keymaster.min.js"></script>
```

Keymaster has no dependencies and can be used completely standalone.
It should not interfere with any JavaScript libraries or frameworks.

## Defining shortcuts

One global method is exposed, `key` which defines shortcuts when
called directly. 

```javascript
// define short of 'a'
key('a', function(){ alert('you pressed a!') });

// returning false stops the event and prevents default browser events
key('ctrl+r', function(){ alert('stopped reload!'); return false });

// multiple shortcuts that do the same thing
key('⌘+r, ctrl+r', function(){ });
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

## Supported keys

Keymaster understands the following modifiers:
`⇧`, `shift`, `option`, `⌥`, `alt`, `ctrl`, `control`, `command`, and `⌘`.

The following special keys can be used for shortcuts:
`backspace`, `tab`, `clear`, `enter`, `return`, `esc`, `escape`, `space`,
`up`, `down`, `left`, `right`, `home`, `end`, `pageup`, `pagedown`, `del`, `delete`
and `f1` through `f19`.

## Modifier key queries

At any point in time (even in code other than key shortcut handlers),
you can query the `key` object for the state of modifier keys. This
allows easy implementation of things like shift+click handlers. For example,
`key.shift` is `true` if the shift key is currently pressed.

```javascript
if(key.shift) alert('shift is pressed, OMGZ!');
```

## Scopes

If you want to reuse the same shortcut for seperate areas in your single page app,
Keymaster supports switching between scopes. Use the `key.setScope` method to set scope.

```javascript
// define shortcuts with a scope
key('o, enter', 'issues', function(){ /* do something */ });
key('o, enter', 'files', function(){ /* do something else */ });

// set the scope (only 'all' and 'issues' shortcuts will be honored)
key.setScope('issues'); // default scope is 'all'
```

## Notes

When an `INPUT`, `SELECT` or `TEXTAREA` element is focused, Keymaster
doesn't process shortcuts.

Keymaster should work with any browser that fires `keyup` and `keydown` events,
and is tested with IE (6+), Safari, Firefox and Chrome.

See [http://madrobby.github.com/keymaster/](http://madrobby.github.com/keymaster/) for a live demo.

## CoffeeScript

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

## Ender support

Add `keymaster` as a top level method to your [Ender](http://ender.no.de) compilation.

    $ ender add keymaster

Use it:

``` js
$.key('⌘+r', function () {
  alert('reload!')
})
```

## Contributing

To contribute, please fork Keymaster, add your patch and tests for it (in the `test/` folder) and
submit a pull request.

## TODOs

* Finish test suite
* Make behavior with `INPUT` / `SELECT` / `TEXTAREA` configurable

Keymaster is (c) 2011 Thomas Fuchs and may be freely distributed under the MIT license.
See the `MIT-LICENSE` file.
