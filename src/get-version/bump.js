// modules
var bump = require('conventional-recommended-bump');
var when = require('when');
var getCurrentVersion = require('../lib/get-current-version');

// public
module.exports = {
  get: get
};

// implementation
function get(options, done) {
  var currentVersion = getCurrentVersion(options.directory);
  var postfix = getPostfix();

  checkBump()
    .then(bumpVersion)
    .then(onSuccess, onError)
    .catch(onError);

  function onSuccess(version) {
    done(null, version);
  }

  function onError(message) {
    done(message);
  }

  function bumpVersion(result) {
    var v = {major: 0, minor: 0, patch: 0};

    switch (result.releaseType) {
      case 'major':
        v.major = currentVersion.major + 1;
        break;
      case 'minor':
        v.major = currentVersion.major;
        v.minor = currentVersion.minor + 1;
        break;
      case 'patch':
      default:
        v.major = currentVersion.major;
        v.minor = currentVersion.minor;
        v.patch = currentVersion.patch + 1;
    }

    return {
      number: [v.major, v.minor, v.patch].join('.') + postfix,
      type: result.releaseType
    };
  }

  function checkBump() {
    return when.promise(function (resolve, reject) {
      bump({
        preset: 'angular'
      }, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  function getPostfix() {
    return options.postfix ? '-' + options.postfix : '';
  }
}
