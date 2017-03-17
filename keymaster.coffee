###
keymaster.js
(c) 2011 Thomas Fuchs
keymaster.js may be freely distributed under the MIT license.
###
_handlers = {}
_mods = { 16: false, 18: false, 17: false, 91: false }
_scope = 'all'
### modifier keys ###
_MODIFIERS = {
	'⇧': 16, shift: 16,
	'⌥': 18, alt: 18, option: 18,
	'⌃': 17, ctrl: 17, control: 17,
	'⌘': 91, command: 91
}
### special keys ###
_MAP = {
	backspace: 8, tab: 9, clear: 12,
	enter: 13, 'return': 13,
	esc: 27, escape: 27, space: 32,
	left: 37, up: 38,
	right: 39, down: 40,
	del: 46, 'delete': 46,
	home: 36, end: 35,
	pageup: 33, pagedown: 34,
	',': 188, '.': 190, '/': 191,
	'`': 192, '-': 189, '=': 187,
	';': 186, '\'': 222,
	'[': 219, ']': 221, '\\': 220
}
_MODIFIERS['f' + k] = 111 + k for k in [1..19]

### handle keydown event ###
dispatch = (event) ->
	tagName = (event.target or event.srcElement).tagName
	key = event.keyCode
	key = 91 if key == 93 or key == 224
	if key in _mods
		_mods[key] = true
		### 'assignKey' from inside this closure is exported to window.key ###
		for k in _MODIFIERS
			assignKey[k] = true if _MODIFIERS[k] == key
		return
	### ignore keypressed in any elements that support keyboard data input ###
	return if tagName == 'INPUT' or tagName == 'SELECT' or tagName == 'TEXTAREA'
	### abort if no potentially matching shortcuts found ###
	return unless key in _handlers
	### for each potential shortcut ###
	for handler in _handlers[key]
		### see if it's in the current scope ###
		if handler.scope == _scope or handler.scope == 'all'
			### check if modifiers match if any ###
			modifiersMatch = handler.mods.length > 0
			for k in _mods
				modifiersMatch = false if (!_mods[k] and +k in handler.mods) or (_mods[k] and +k in handler.mods)
			### call the handler and stop the event if neccessary ###
			if modifiersMatch or (handler.mods.length == 0 and !_mods[16] and !_mods[18] and !_mods[17] and !_mods[91])
				if handler.method(event, handler) == false
					if event.preventDefault then event.preventDefault() else event.returnValue = false
					event.stopPropagation() if event.stopPropagation
					event.cancelBubble = true if event.cancelBubble
	return

### unset modifier keys on keyup ###
clearModifier = (event) ->
	key = event.keyCode
	key = 91 if key == 93 or key = 224
	if key in _mods
		_mods[key] = false
		for k in _MODIFIERS
			assignKey[k] = false if _MODIFIERS[k] == key
	return

### parse and assign shortcut ###
assignKey = (key, scope, method) ->
	unless method?
		method = scope
		scope = 'all'
	key = key.replace /\s/g, ''
	keys = key.split ','
	keys[keys.length - 2] += ',' if keys[keys.length - 1] == ''
	### for each shortcut ###
	for i in keys.length
		### set modifier keys if any ###
		mods = []
		key = keys[i].split '+'
		if key.length > 1
			mods = key.slice 0, key.length - 1
			for mi in mods.length
				mods[mi] = _MODIFIERS[mods[mi]]
			key = [key[key.length - 1]]
		### convert to keycode and... ###
		key = key[0]
		key = _MAP[key] or key.toUpperCase().charCodeAt(0);
		### ...store handler ###
		_handlers[key] = [] unless key in _handlers
		_handlers[key].push { shortcut: keys[i], scope: scope, method: method, key: keys[i], mods: mods }
	return

### initialize key.<modifier> to false ###
assignKey[k] = false for k in _MODIFIERS

### set current scope (default 'all') ###
setScope = (scope) ->
	_scope = scope || 'all'

### cross-browser events ###
addEvent = (object, event, method) ->
	if object.addEventListener then object.addEventListener event, method, false
	else if object.attachEvent then object.attachEvent 'on' + event, () -> method window.event

### set the handlers globally on document ###
addEvent document, 'keydown', dispatch
addEvent document, 'keyup', clearModifier

### set window.key and window.key.setScope ###
global.key = assignKey;
global.key.setScope = setScope;
module.exports = key if typeof module != 'undefined'
