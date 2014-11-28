'use strict';

Tinytest.add('Instantiation', function (test) {
  key('k', function() { alert('Test passed') });

  test.ok({message: 'Test passes if you see an alert when pressing k'});
});
