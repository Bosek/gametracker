import nconf from 'nconf';
import yargs from 'yargs';

nconf.env('__');

const { name, version } = require('../package.json');

const argv = yargs
  .env()
  .option('port', {
    alias: 'p',
    default: 3000,
    desc: 'Listening port',
    number: true,
  })
  .option('production', {
    alias: 'P',
    boolean: true,
    default: false,
    desc: 'Run in production mode',
  })
  .argv;

nconf.overrides({
  port: argv.port,
  isDevelopment: !argv.production,
});

nconf.defaults({
    appName: name,
    appVersion: version,
});

export default nconf.get();
