import gulp from 'gulp'
import babel from 'gulp-babel'
import Cache from 'gulp-file-cache'
import nodemon from 'gulp-nodemon'
import uglify from 'gulp-uglify'

const cache = new Cache()

const transpile = () =>
  gulp.src('./src/**/*.js') // your ES2015 code
    .pipe(cache.filter()) // remember files
    .pipe(babel({ presets: [ '@babel/preset-env' ] })) // compile new ones
    .pipe(cache.cache()) // cache them
    .pipe(gulp.dest('./dist')) // write them

const minify = () =>
  gulp.src('./dist/**/*.js') // your pre-transpiled code
    .pipe(uglify()) // uglify them
    .pipe(gulp.dest('./dist')) // overwrite them

const watch = done => nodemon({
  script: 'dist/', // run ES5 code
  watch: 'src', // watch ES2015 code
  tasks: [ 'transpile' ], // compile synchronously onChange
  done,
})

gulp.task('transpile', gulp.series(transpile))
gulp.task('start', gulp.series(transpile, watch))
gulp.task('build', gulp.series([ transpile, minify ]))
