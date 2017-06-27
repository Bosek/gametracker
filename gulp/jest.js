import { spawn } from 'child_process';
import gulp from 'gulp';

// https://stackoverflow.com/a/43285131
const npmCommand = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';

gulp.task('jest', done => {
  spawn(npmCommand, ['run', 'jest'], { stdio: 'inherit' })
    .on('close', done);
});

gulp.task('jest-watch', done => {
  spawn(npmCommand, ['run', 'jest:watch'], { stdio: 'inherit' })
    .on('close', done);
});
