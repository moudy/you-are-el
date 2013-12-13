function Value (value) {
  this.value = value.replace(/^\s+|\s+$/g, '');
}

function youAreEl (value) {
  return new Value(value);
}

module.exports = youAreEl;

var defaultProtocal = 'http://';
var protocalReg = /^http(s?):\/\//;

function stripProtocal (val) {
  return val.replace(protocalReg, '');
}

function stripHost (val) {
  var match = val.match(/\.([a-z\.]{2,6})/i);
  var tld;
  if (match) {
    tld = match[0];
    val = val.split(tld)[1];
  }
  return val;
}

function stripLeadingAndTrailigSlashes (val) {
  return val.replace(/^\//, '').replace(/\/$/, '');
}

function ensureProtocal (val) {
  if (val.match(protocalReg)) return val;
  return defaultProtocal+val;
}

Value.prototype.toPath = function () {
  var v = stripProtocal(this.value);
  v = stripHost(v);
  v = stripLeadingAndTrailigSlashes(v);
  return v;
};

Value.prototype.toUrl = function (options) {
  var path = this.toPath();
  var protocal = '';
  var ret;
  if ('string' === typeof options) {
    options = ensureProtocal(options);
    ret = options+'/'+path;
  } else {
    if (options.protocal !== false) protocal = options.protocal || defaultProtocal;
    ret = protocal+options.host+'/'+path;
  }
  return ret;
};

