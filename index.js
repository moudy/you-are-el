function Value (value) {
  this.value = value.replace(/^\s+|\s+$/g, '');
}

function youAreEl (value) {
  return new Value(value);
}

module.exports = youAreEl;

var defaultProtocal = 'http://';
var protocolReg = /^http(s?):\/\//;

function stripProtocol (val) {
  return val.replace(protocolReg, '');
}

function stripHost (val) {
  var match = val.match(/\.([a-z\.]{2,6}\/)/i);
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

function ensureProtocal (val, protocol) {
  if (protocol) return protocol+stripProtocol(val);
  if (val.match(protocolReg)) return val;
  return defaultProtocal+val;
}

Value.prototype.toPath = function () {
  var v = stripProtocol(this.value);
  v = stripHost(v);
  v = stripLeadingAndTrailigSlashes(v);
  return v;
};

Value.prototype.toUrl = function (options) {
  options = options || {};
  var value = this.value;
  var protocol = '';
  var ret;
  if ('string' === typeof options) {
    options = ensureProtocal(options);
    ret = options+'/'+this.toPath(); //+'/'+path;
  } else if (!options.host && options.protocol === false) {
    ret = stripProtocol(value);
  } else if (!options.host) {
    ret = ensureProtocal(value, options.protocol);
  } else {
    if (options.protocol !== false) protocol = options.protocol || defaultProtocal;
    ret = protocol+options.host+'/'+this.toPath();
  }
  return ret;
};

