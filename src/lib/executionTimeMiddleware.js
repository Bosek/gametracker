import chalk from 'chalk';

export default (setHeader, verbose) => (req, res, next) => {
  req.startTime = process.hrtime();
  req.timeFromRequest = () => Math.floor(process.hrtime(req.startTime)[1] / 1e6);

  const endFunction = res.end;
  res.end = (...params) => {
    const requestDuration = `${req.timeFromRequest()}ms`;

    if (verbose) {
      const message = `[${req.ip}] ${req.method} ${req.originalUrl} ${res.statusCode} executed in ${requestDuration}`;
      console.log(`${chalk.styles.bgYellow.open}${message}${chalk.styles.bgYellow.close}`); // eslint-disable-line no-console
    }
    if (setHeader && !res.headersSent) {
      res.set('X-Execution-Time', requestDuration);
    }
    return endFunction.call(res, ...params);
  };

  next();
};
