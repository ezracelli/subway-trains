import gulp from 'gulp'
import babel from 'gulp-babel'
import Cache from 'gulp-file-cache'
import uglify from 'gulp-uglify'

const cache = new Cache()

const transpile = () =>
  gulp.src('./api/src/**/*.js') // your ES2015 code
    .pipe(cache.filter()) // remember files
    .pipe(babel({ presets: [ '@babel/preset-env' ] })) // compile new ones
    .pipe(cache.cache()) // cache them
    .pipe(gulp.dest('./api/dist')) // write them

const minify = () =>
  gulp.src('./api/dist/**/*.js') // your pre-transpiled code
    .pipe(uglify()) // uglify them
    .pipe(gulp.dest('./api/dist')) // overwrite them

gulp.task('transpile', gulp.series(transpile))
gulp.task('build', gulp.series([ transpile, minify ]))
