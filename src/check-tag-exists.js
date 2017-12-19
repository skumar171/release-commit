// 3rd party modules
var when = require('when');

// Modules
var childProcess = require('./lib/child-process');

// Public
module.exports = checkTagExists;

// Implementation
function checkTagExists(options) {
  if (options.noTag || options.force) {
    return when.resolve(options);
  }
  return childProcess.exec('git tag --list ' + options.version)
    .then(function (output) {
      if (output.stdout === options.version) {
        return when.reject('A tag with name "' + options.version + '" already exists.');
      }
      return options;
    });
}
