// Node modules
var path = require('path');

// 3rd party modules
var pathToPackageJsonToReadme = require.resolve('package-json-to-readme');

// Modules
var childProcess = require('../lib/child-process');
var fs = require('../lib/fs');

// Public
module.exports = updateDependencyLog;

// Implementation
function updateDependencyLog(options) {
  var pkgPath = path.resolve(options.directory, 'package.json');
  var logFile = path.resolve(options.directory, 'DEPENDENCIES.md');
  return childProcess.spawn('node', [pathToPackageJsonToReadme, '--no-footer', pkgPath])
    .then(function (logData) {
      return fs.writeFile(logFile, logData.stdout);
    })
    .then(function () {
      return options;
    });
}
