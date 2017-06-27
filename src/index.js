import { printReadme } from 'gamedig/lib/typeresolver';
import chalk from 'chalk';
import config from './config';
import errorHandlerMiddleware from './lib/errorHandlerMiddleware';
import executionTimeMiddleware from './lib/executionTimeMiddleware';
import express from 'express';
import gamedig from 'gamedig';

const app = express();

app.use(executionTimeMiddleware(true, config.isDevelopment));
app.use((req, res, next) => {
  res.set('Content-Type', 'text/json; charset=utf-8');
  next();
});

app.get('/', (req, res) => {
  // Sending message at once is preferable option
  // if we want executionTimeMiddleware to set headers
  const message = [
    'Specify URL as: /<game>/<hostIP>/[<port>]',
    '       Example: /teamspeak3/ts.drungor.com',
    '',
    'Games(use short name as in parentheses):',
    printReadme(),
  ].join('\n');

  res.send(message);
});

app.get('/:type/:host/:port?', (req, res) => {
  const opts = {
    type: req.params.type,
    host: req.params.host,
  };
  if (req.params.port) {
    try {
      opts.port = parseInt(req.params.port, 10);
    } catch (error) {
      res.status(403).send(JSON.stringify({ error: 'Invalid port format.' }, null, 2));
      return;
    }
  }
  gamedig
    .query(opts)
    .then((response) => {
      res.status(200).send(
        JSON.stringify(typeof response === 'object' ? response : { response }, null, 2),
      );
    })
    .catch((error) => {
      res.status(403).send(JSON.stringify({ error }, null, 2));
    });
});

app.use(errorHandlerMiddleware(config.isDevelopment));

app.listen(config.port, () => {
  const mode = config.isDevelopment ? 'development' : 'production';

  const message = chalk.styles.bgGreen.open + // eslint-disable-line prefer-template
                  `${config.appName} v${config.appVersion} is now listening on port ` +
                  `${config.port} in ${mode} mode` +
                  chalk.styles.bgGreen.close;
  console.log(message); // eslint-disable-line no-console
});
