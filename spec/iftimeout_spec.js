'use strict';

var ifTimeout = require('../index');
var EventEmiter = require('events').EventEmitter;

describe('if-timeout', function () {
  it('should not call callback before timeout', function (done) {
    var callback = function () {
      done.fail();
    };
    var response = new EventEmiter();
    var request = { path: function () { return ''; } };
    var middleware = ifTimeout(callback, { timeout: 100 });

    middleware(request, response, function () {});
    setTimeout(function () {
      response.emit('finish');
      done();
    }, 50);
  });

  it('should call callback after timeout', function (done) {
    var callback = function () {
      done();
    };
    var response = new EventEmiter();
    var request = { path: function () { return ''; } };
    var middleware = ifTimeout(callback, { timeout: 100 });

    middleware(request, response, function () {});
    setTimeout(function () {
      response.emit('finish');
      done.fail();
    }, 150);
  });
});
