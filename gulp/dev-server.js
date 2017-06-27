import bg from 'gulp-bg';
import gulp from 'gulp';

let bgtask;
// const exitCallback = (proc) => { if (proc.errorcode !== 0) { process.exit(proc.errorcode); } };

gulp.task('node-start', (done) => {
  bgtask = bg('node', 'src/dev-server.js');
  bgtask();
  done();
});

gulp.task('node-stop', (done) => {
  bgtask.stop();
  done();
});

gulp.task('node-watch', () => {
  gulp.watch(['src/**/*.js', '!src/**/__tests__/*.js'], gulp.series('node-stop', 'node-start', 'node-watch'));
});

gulp.task('dev-server', gulp.series('node-start', 'node-watch'));
