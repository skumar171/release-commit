// Modules
var childProcess = require('../lib/child-process');

// Public
module.exports = bump;

// Implementation
function bump(options) {
  return childProcess
    .exec('npm version ' + options.version + ' --no-git-tag-version --force')
    .then(function () {
      return options;
    });
}
