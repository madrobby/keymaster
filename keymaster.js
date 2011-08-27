//     keymaster.js
//     (c) 2011 Thomas Fuchs
//     keymaster.js may be freely distributed under the MIT license.

;(function(global){
  var _handlers = {}, 
    _scope = 'all', 
    _MAP = { 
      'backspace': 8, 'tab': 9,
      'enter': 13, 'return': 13,
      'escape': 27, 'space': 32,
      'left': 37, 'up': 38,
      'right': 39, 'down': 40 };
  
  function dispatch(event){
    var key, tagName;
    tagName = event.srcElement.tagName;
    if (tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA') return;
    key = event.keyCode.toString();
    if (!(key in _handlers)) return;
    _handlers[key].forEach(function(handler){
      if(handler.scope == _scope || handler.scope == 'all')
        handler.method(event, handler.key, handler.scope);
    });
  }

  function assignKey(key, scope, method){
    var keys;
    if (method === undefined) {
      method = scope;
      scope = 'all';
    }
    key = key.replace(/\s/g,'');
    keys = key.split(',');
    keys.forEach(function(key){
      key = key.length > 1 ? _MAP[key] : key.toUpperCase().charCodeAt(0);
      if (!(key in _handlers)) _handlers[key] = [];
      _handlers[key].push({ scope: scope, method: method });
    });
  }

  function setScope(scope){ _scope = scope || 'all' }

  document.body.addEventListener('keydown', dispatch);  
  global.key = assignKey;
  global.keyScope = setScope;
})(this);
