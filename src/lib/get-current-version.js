// Modules
var explodeVersion = require('./explode-version');

// Public
module.exports = getCurrentVersion;

// Implementation
function getCurrentVersion(dir) {
  // eslint-disable-next-line import/no-dynamic-require
  return explodeVersion(require(dir + '/package.json').version);
}
