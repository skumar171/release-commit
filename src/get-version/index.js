// 3rd party modules
var when = require('when');
var bump = require('./bump');

// public
module.exports = getVersion;

// implementation
function getVersion(options) {
  if (options.overrideVersion) {
    options.version = options.overrideVersion;
    return when.resolve(options);
  }
  return when.promise(function (resolve, reject) {
    bump.get(options, function (err, version) {
      if (err) {
        reject(err);
      } else {
        options.version = version.number;
        options.type = version.type;

        resolve(options);
      }
    });
  });
}
