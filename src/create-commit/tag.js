// 3rd party modules
var when = require('when');

// Modules
var childProcess = require('../lib/child-process');
var checkTagExists = require('./check-tag-exists');

// Public
module.exports = tag;

// Implementation
function tag(options) {
  if (options.tag) {
    return checkTagExists(options)
      .then(
        function (options) {
          return childProcess
            .exec('git tag ' + options.version + (options.force ? ' --force' : ''))
            .then(function () {
              return options;
            });
        }
      )
      .catch(
        function (err) {
          return err;
        }
      );
  }
  return when.resolve(options);
}
