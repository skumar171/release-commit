// node modules
var path = require('path');

// 3rd party modules
var changelog = require('generate-changelog');
var when = require('when');

// modules
var fs = require('../lib/fs');

// public
module.exports = updateChangeLog;

// implementation
function updateChangeLog(options) {
  return when.promise(function (resolve, reject) {
    var config = {
      exclude: ['chore', 'style']
    };
    var readFile = path.join(options.directory, 'CHANGELOG.md');
    var writeFile = path.join(options.directory, '.CHANGELOG.md');
    var writeStream = fs.createWriteStream(writeFile);

    writeStream.on('finish', onWriteEnd);

    config[options.type || 'patch'] = true;

    changelog
      .generate(config)
      .then(writeChanges)
      .then(readRest);

    function writeChanges(chunk) {
      writeStream.write(chunk);
    }

    function readRest() {
      fs.createReadStream(readFile).pipe(writeStream);
    }

    function onWriteEnd(err) {
      if (err) {
        reject(err);
      } else {
        fs.unlink(readFile, onUnlink);
      }
    }

    function onUnlink(err) {
      if (err) {
        reject(err);
      } else {
        fs.rename(writeFile, readFile, finish);
      }
    }

    function finish(err) {
      if (err) {
        reject(err);
      } else {
        resolve(options);
      }
    }
  });
}
