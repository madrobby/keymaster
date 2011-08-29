//     keymaster.js
//     (c) 2011 Thomas Fuchs
//     keymaster.js may be freely distributed under the MIT license.

;(function(global){
  var k,
    _handlers = {}, 
    _mods = { 16: false, 18: false, 17: false, 91: false },
    _scope = 'all',
    _MODIFIERS = {
      shift: 16, 
      option: 18, '⌥': 18, alt: 18, 
      ctrl: 17, control: 17, 
      command: 91, '⌘': 91 },
    _MAP = {
      backspace: 8, tab: 9,
      enter: 13, 'return': 13,
      escape: 27, space: 32,
      left: 37, up: 38,
      right: 39, down: 40 };
  
  function dispatch(event){
    var key, tagName, handler, k,i, hl, hmi, hmil, modifiersMatch;
    tagName = (event.target || event.srcElement).tagName;
    key = event.keyCode;
    if(key in _mods) {
      _mods[key] = true;
      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = true;
      return;
    }
    if (tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA') return;
    if (!(key in _handlers)) return;
    for (i = 0, hl = _handlers[key].length; i < hl; i++) {
      handler = _handlers[key][i];
      if(handler.scope == _scope || handler.scope == 'all'){
        modifiersMatch = (handler.mods.length > 0 && (function(){
          for(hmi = 0, hmil = handler.mods.length; hmi < hmil; hmi++)
            if(!_mods[handler.mods[hmi]])
              return false;
          return true;
        })());
        if((handler.mods.length == 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91]) || modifiersMatch){
          if(handler.method(event, handler.key, handler.scope)===false){
            if(event.stopPropagation) event.stopPropagation();
            if(event.cancelBubble) event.cancelBubble();
            if(event.preventDefault) event.preventDefault();
              else event.returnValue = false;
          }
        }
      }
	}
  };

  function clearModifier(event){
    var key = event.keyCode, k;
    if(key in _mods) {
      _mods[key] = false;
      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = false;
    }
  };

  function assignKey(key, scope, method){
    var keys, mods, i, mi, kl, ml;
    if (method === undefined) {
      method = scope;
      scope = 'all';
    }
    key = key.replace(/\s/g,'');
    keys = key.split(',');
    for (i = 0, kl = keys.length; i < kl; i++) {
      mods = [];
      key = keys[i].split('+');
      if(key.length > 1){
        mods = key.slice(0,key.length-1);
        for (mi = 0, ml = mods.length; mi < ml; mi++)
          mods[mi] = _MODIFIERS[mods[mi]];
        key = [key[key.length-1]];
      }
      key = key[0]
      key = key.length > 1 ? _MAP[key] : key.toUpperCase().charCodeAt(0);
      if (!(key in _handlers)) _handlers[key] = [];
      _handlers[key].push({ scope: scope, method: method, key: keys[i], mods: mods });
    }
  };

  for(k in _MODIFIERS) assignKey[k] = false;

  function setScope(scope){ _scope = scope || 'all' };
  
  function addEvent(object, event, method) {
    if (object.addEventListener)
      object.addEventListener(event, method, false);
    else if(object.attachEvent)
      object.attachEvent('on'+event, function(){ method(window.event) });
  };
  
  addEvent(document, 'keydown', dispatch);
  addEvent(document, 'keyup', clearModifier);
  
  global.key = assignKey;
  global.key.setScope = setScope;
})(this);
