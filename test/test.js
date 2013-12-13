/* globals describe, it, require */

var expect = require('chai').expect;
var youAreEl = require('../index');

describe('youAreEl', function () {

  var http = 'http://';
  var https = 'https://';
  var host = 'facebook.com';
  var path = 'foo/bar';
  var fullUrl = http+host+'/'+path;
  var fullHttpsUrl = https+host+'/'+path;

  describe('#toPath', function () {

    it('returns the path from a url', function () {
      var url = youAreEl(fullUrl).toPath();
      expect(url).to.equal(path);
    });

    it('returns the path from a https url', function () {
      var url = youAreEl(fullHttpsUrl).toPath();
      expect(url).to.equal(path);
    });

    it('strips the leading and trailing slashes when the is no host', function () {
      var url = youAreEl('/'+path+'/').toPath();
      expect(url).to.equal(path);
    });

    it('strips the protocol when there is not host', function () {
      var url = youAreEl(http+path).toPath();
      expect(url).to.equal(path);
    });

    it('does nothing if it is already a path', function () {
      var url = youAreEl(path).toPath();
      expect(url).to.equal(path);
    });

  });

  describe('#toUrl', function () {
    it ('turns a path into a url', function () {
      var url = youAreEl(path).toUrl(host);
      expect(url).to.equal(fullUrl);
    });

    it ('turns a path into a url with the host/protocol passed in as options', function () {
      var url = youAreEl(path).toUrl({protocol: https, host: host});
      expect(url).to.equal(fullHttpsUrl);
    });

    it ('adds a default protocol', function () {
      var url = youAreEl(path).toUrl({ host: host});
      expect(url).to.equal(fullUrl);
    });

    it ('omits the protocol', function () {
      var url = youAreEl(path).toUrl({ protocol: false, host: host});
      expect(url).to.equal(host+'/'+path);
    });
  });

});

