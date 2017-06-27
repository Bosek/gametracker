'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nconf = require('nconf');

var _nconf2 = _interopRequireDefault(_nconf);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_nconf2.default.env('__');

const { name, version } = require('../package.json');

const argv = _yargs2.default.env().option('port', {
  alias: 'p',
  default: 3000,
  desc: 'Listening port',
  number: true
}).option('production', {
  alias: 'P',
  boolean: true,
  default: false,
  desc: 'Run in production mode'
}).argv;

_nconf2.default.overrides({
  port: argv.port,
  isDevelopment: !argv.production
});

_nconf2.default.defaults({
  appName: name,
  appVersion: version
});

exports.default = _nconf2.default.get();