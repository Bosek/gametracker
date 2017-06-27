'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (setHeader, verbose) => (req, res, next) => {
  req.startTime = process.hrtime();
  req.timeFromRequest = () => Math.floor(process.hrtime(req.startTime)[1] / 1e6);

  const endFunction = res.end;
  res.end = (...params) => {
    const requestDuration = `${req.timeFromRequest()}ms`;

    if (verbose) {
      const message = `[${req.ip}] ${req.method} ${req.originalUrl} ${res.statusCode} executed in ${requestDuration}`;
      console.log(`${_chalk2.default.styles.bgYellow.open}${message}${_chalk2.default.styles.bgYellow.close}`); // eslint-disable-line no-console
    }
    if (setHeader && !res.headersSent) {
      res.set('X-Execution-Time', requestDuration);
    }
    return endFunction.call(res, ...params);
  };

  next();
};