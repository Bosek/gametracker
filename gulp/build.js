import babel from 'gulp-babel';
import del from 'del';
import gulp from 'gulp';

gulp.task('clean', () => del(['build']));

gulp.task('babelize', () => gulp.src([
                                'src/**/*.js',
                                '!src/dev-server.js',
                                '!src/**/__tests__/*.js',
                              ])
                              .pipe(babel())
                              .pipe(gulp.dest('build')),
                            );

gulp.task('build', gulp.series('clean', 'babelize'));
