// 3rd party modules
var when = require('when');

// modules
var childProcess = require('../lib/child-process');

// public
module.exports = checkTagExists;

// implementation
function checkTagExists(options) {
  if (options.force) {
    return when.resolve(true);
  }

  return childProcess.exec('git tag --list ' + options.version)
    .then(function (output) {
      if (output.stdout === options.version) {
        return when.reject('A tag with name "' + options.version + '" already exists.');
      }
      return options;
    });
}
