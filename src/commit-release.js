// Modules
var createCommit = require('./create-commit');
var getVersion = require('./get-version');

// Public
module.exports = commitRelease;

// Implementation
function commitRelease(options, done) {
  getVersion(options)
    .then(createCommit)
    .then(onSuccess, onError)
    .catch(onError);

  function onSuccess() {
    done(null, options);
  }

  function onError(message) {
    done(message);
  }
}
