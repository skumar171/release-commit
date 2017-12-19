// 3rd party modules
var fs = require('graceful-fs');
var whenNode = require('when/node');

// Modules
var rateLimit = require('./rate-limit');

// Public
module.exports = {
  createReadStream: fs.createReadStream,
  createWriteStream: fs.createWriteStream,
  rename: fs.rename,
  unlink: fs.unlink,
  writeFile: wrap(fs.writeFile)
};

function wrap(fn) {
  return rateLimit(whenNode.lift(fn));
}
