"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = printToConsole => (err, req, res, next) => {
  if (!err) {
    next();
  }

  if (printToConsole) {
    console.log(err); // eslint-disable-line no-console
  }
  res.status(err.httpCode ? err.httpCode : 403).end();
};