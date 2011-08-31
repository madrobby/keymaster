!function ($, k) {
  k = require('key')
  $.ender({
    key: function (combo) {
      k(combo)
    }
  })
}(ender)