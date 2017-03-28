// 3rd party modules
var when = require('when');
var bump = require('./bump');
var explodeVersion = require('../lib/explode-version');
var getCurrentVersion = require('../lib/get-current-version');

// public
module.exports = getVersion;

// implementation
function getVersion(options) {
  if (options.overrideVersion) {
    var newVersion, currentVersion;

    options.version = options.overrideVersion;

    newVersion = explodeVersion(options.version);
    currentVersion = getCurrentVersion(options.directory);

    options.type = ['major', 'minor', 'patch'].reverse().reduce(function(type, name) {
      if (newVersion[name] !== currentVersion[name]) {
        type = name;
      }
      return type;
    });

    return when.resolve(options);
  }
  return when.promise(function (resolve, reject) {
    bump.get(options, function (err, version) {
      if (err) {
        reject(err);
      } else {
        options.version = version.number;
        options.type = version.type;

        resolve(options);
      }
    });
  });
}
