// 3rd party modules
var when = require('when');
var cr = {
  v: require('conventional-recommended-version'),
  b: require('./bump')
};

// public
module.exports = getVersion;

// implementation
function getVersion(options) {
  if (options.overrideVersion) {
    options.version = options.overrideVersion;
    return when.resolve(options);
  }
  return when.promise(function (resolve, reject) {
    var method = options.bump ? 'b' : 'v';

    cr[method].get(options, function (err, version) {
      if (err) {
        reject(err);
      } else {
        options.version = version;
        resolve(options);
      }
    });
  });
}
