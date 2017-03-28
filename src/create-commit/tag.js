// 3rd party modules
var when = require('when');

// modules
var childProcess = require('../lib/child-process');
var checkTagExists = require('./check-tag-exists');

// public
module.exports = tag;

// implementation
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
