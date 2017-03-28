// 3rd party modules
var fs = require('graceful-fs');
var whenNode = require('when/node');

// modules
var rateLimit = require('./rate-limit');

// public
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
