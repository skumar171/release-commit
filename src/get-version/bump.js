// modules
var bump = require('conventional-recommended-bump');
var when = require('when');

// public
module.exports = {
  get: get
};

// implementation
function get(options, done) {
  var currentVersion = getCurrentVersion();
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

  function getCurrentVersion() {
    var levels = ['major', 'minor', 'patch', 'postfix'];

    return require(options.directory + '/package.json') // eslint-disable-line import/no-dynamic-require
      .version
      .split('.')
      .reduce(function (obj, num, i) {
        if (i === 2) {
          num = num.split('-');
          obj[levels[i + 1]] = num[1] || '';
          num = num[0];
        }

        obj[levels[i]] = parseInt(num, 10);

        return obj;
      }, {});
  }

  function getPostfix() {
    return options.postfix ? '-' + options.postfix : '';
  }
}
