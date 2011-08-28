//     keymaster.js
//     (c) 2011 Thomas Fuchs
//     keymaster.js may be freely distributed under the MIT license.

;(function(global){
  var _handlers = {}, 
    _mods = { 16: false, 18: false, 17: false, 91: false },
    _scope = 'all',
    _MODIFIERS = {
      shift: 16, option: 18, '⌥': 18, alt: 18, ctrl: 17, control: 17, command: 91, '⌘': 91 },
    _MAP = {
      backspace: 8, tab: 9,
      enter: 13, 'return': 13,
      escape: 27, space: 32,
      left: 37, up: 38,
      right: 39, down: 40 };
  
  function dispatch(event){
    var key, tagName;
    tagName = event.target.tagName;
    key = event.keyCode;
    if(key in _mods) return _mods[key] = true;
    if (tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA') return;
    if (!(key in _handlers)) return;
    _handlers[key].forEach(function(handler){
      if(handler.scope == _scope || handler.scope == 'all')
        if((handler.mods.length == 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91]) ||
          (handler.mods.length > 0 && handler.mods.every(function(mod){ return _mods[mod] })))
          if(handler.method(event, handler.key, handler.scope)===false){
            event.stopPropagation();
            event.preventDefault();
          }
    });
  }

  function clearModifier(event){
    var key = event.keyCode;
    if(key in _mods) _mods[key] = false;
  }

  function assignKey(key, scope, method){
    var keys, mods;
    if (method === undefined) {
      method = scope;
      scope = 'all';
    }
    key = key.replace(/\s/g,'');
    keys = key.split(',');
    keys.forEach(function(originalKey){
      mods = [];
      key = originalKey.split('+');
      if(key.length > 1){
        mods = key.slice(0,key.length-1).map(function(mod){ return _MODIFIERS[mod] });
        key = [key[key.length-1]];
      }
      key = key[0]
      key = key.length > 1 ? _MAP[key] : key.toUpperCase().charCodeAt(0);
      if (!(key in _handlers)) _handlers[key] = [];
      _handlers[key].push({ scope: scope, method: method, key: originalKey, mods: mods });
    });
  }

  function setScope(scope){ _scope = scope || 'all' }

  document.addEventListener('keydown', dispatch, false);
  document.addEventListener('keyup', clearModifier, false);
  global.key = assignKey;
  global.keyScope = setScope;
})(this);
