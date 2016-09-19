'use strict';

module.exports = function (callback, _options) {
  var options = _options || {};
  options.timeout = options.timeout || 30 * 1000;
  options.ignore = options.ignore || [];

  function ignore(path) {
    for (var i = 0; i < options.ignore.length; i++) {
      let regex = options.ignore[i];
      if (regex.test(path)) return true;
    }
    return false;
  }

  return function (req, res, next) {
    if (!ignore(req.path())) {
      var timeout = setTimeout(callback.bind(null, req, res, next), options.timeout);
      res.on('finish', function () { clearTimeout(timeout); });
    }
    next();
  };

};
