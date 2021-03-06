// Modules
var bump = require('./bump');
var checkVersion = require('./check-version');
var commit = require('./commit');
var stage = require('./stage');
var tag = require('./tag');
var updateChangeLog = require('./update-change-log');
var updateDependencyLog = require('./update-dependency-log');

// Public
module.exports = createCommit;

// Implementation
function createCommit(options) {
  return checkVersion(options)
    .then(bump)
    .then(updateChangeLog)
    .then(updateDependencyLog)
    .then(stage)
    .then(commit)
    .then(tag);
}
