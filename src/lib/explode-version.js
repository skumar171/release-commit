// definitions
var levels = ['major', 'minor', 'patch', 'postfix'];

// public
module.exports = explodeVersion;

// implementation
function explodeVersion(str) {
  return str.split('.')
    .reduce(assignLevel, {});
}

function assignLevel(obj, num, i) {
  if (i === 2) {
    num = num.split('-');
    obj[levels[i + 1]] = num[1] || '';
    num = num[0];
  }

  if (i < 3) {
    obj[levels[i]] = parseInt(num, 10);
  }

  return obj;
}
