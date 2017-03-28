// modules
var explodeVersion = require('./explode-version');

// public
module.exports = getCurrentVersion;

// implementation
function getCurrentVersion(dir) {
  // eslint-disable-next-line import/no-dynamic-require
  return explodeVersion(require(dir + '/package.json').version);
}
