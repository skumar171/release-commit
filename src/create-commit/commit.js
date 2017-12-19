// Modules
var childProcess = require('../lib/child-process');

// Public
module.exports = commit;

// Implementation
function commit(options) {
  var baseArgs = ['commit', '-m', 'chore(release): ' + options.version];
  var args = options.noVerify ? baseArgs.concat('--no-verify') : baseArgs;
  return childProcess.spawn('git', args).then(function () {
    return options;
  });
}
