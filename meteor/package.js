// package metadata file for Meteor.js

var packageName = 'keymaster:keymaster';  // http://atmospherejs.com/keymaster/keymaster
var where = 'client';  // where to install: 'client', 'server', or ['client', 'server']

var packageJson = JSON.parse(Npm.require("fs").readFileSync('package.json'));

Package.describe({
  name: packageName,
  summary: 'Keymaster (official): defining and dispatching keyboard shortcuts, with scopes and filtering',
  version: packageJson.version,
  git: 'https://github.com/madrobby/keymaster.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@0.9.0');
  api.export('key');
  api.addFiles([
    'keymaster.js',
    'meteor/export.js'
  ], where);
});

Package.onTest(function (api) {
  api.use(packageName, where);
  api.use('tinytest', where);

  api.addFiles('meteor/test.js', where);
});
