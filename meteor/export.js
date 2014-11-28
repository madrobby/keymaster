// expose Keymaster to Meteor.js
if (typeof Package !== 'undefined') {
  /*global key:true*/  // Meteor.js creates a file-scope global for exporting. This comment prevents a potential JSHint warning.
  key = window.key;
  delete window.key;
}
