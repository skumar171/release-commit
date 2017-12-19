// Node modules
var path = require('path');

// Modules
var childProcess = require('../lib/child-process');

// Public
module.exports = clearLog;

// Implementation
function clearLog(options) {
  return childProcess.exec('rm -f ' + path.resolve(options.directory, 'CHANGELOG.md'))
    .then(function () {
      return options;
    });
}
