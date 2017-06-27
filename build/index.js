'use strict';

var _typeresolver = require('gamedig/lib/typeresolver');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _errorHandlerMiddleware = require('./lib/errorHandlerMiddleware');

var _errorHandlerMiddleware2 = _interopRequireDefault(_errorHandlerMiddleware);

var _executionTimeMiddleware = require('./lib/executionTimeMiddleware');

var _executionTimeMiddleware2 = _interopRequireDefault(_executionTimeMiddleware);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _gamedig = require('gamedig');

var _gamedig2 = _interopRequireDefault(_gamedig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

app.use((0, _executionTimeMiddleware2.default)(true, _config2.default.isDevelopment));
app.use((req, res, next) => {
  res.set('Content-Type', 'text/json; charset=utf-8');
  next();
});

app.get('/', (req, res) => {
  // Sending message at once is preferable option
  // if we want executionTimeMiddleware to set headers
  const message = ['Specify URL as: /<game>/<hostIP>/[<port>]', '       Example: /teamspeak3/ts.drungor.com', '', 'Games(use short name as in parentheses):', (0, _typeresolver.printReadme)()].join('\n');

  res.send(message);
});

app.get('/:type/:host/:port?', (req, res) => {
  const opts = {
    type: req.params.type,
    host: req.params.host
  };
  if (req.params.port) {
    try {
      opts.port = parseInt(req.params.port, 10);
    } catch (error) {
      res.status(403).send(JSON.stringify({ error: 'Invalid port format.' }, null, 2));
      return;
    }
  }
  _gamedig2.default.query(opts).then(response => {
    res.status(200).send(JSON.stringify(typeof response === 'object' ? response : { response }, null, 2));
  }).catch(error => {
    res.status(403).send(JSON.stringify({ error }, null, 2));
  });
});

app.use((0, _errorHandlerMiddleware2.default)(_config2.default.isDevelopment));

app.listen(_config2.default.port, () => {
  const mode = _config2.default.isDevelopment ? 'development' : 'production';

  const message = _chalk2.default.styles.bgGreen.open + // eslint-disable-line prefer-template
  `${_config2.default.appName} v${_config2.default.appVersion} is now listening on port ` + `${_config2.default.port} in ${mode} mode` + _chalk2.default.styles.bgGreen.close;
  console.log(message); // eslint-disable-line no-console
});