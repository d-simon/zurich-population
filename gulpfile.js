var gulp = require('gulp'),
    gutil = require('gulp-util'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    jsonminify = require('gulp-jsonminify'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint');

var env = process.env.NODE_ENV || 'development',
    outputDir = 'builds/development/',
    sassStyle = 'expanded';

if (env === 'production') {
  outputDir = 'builds/production/';
  sassStyle = 'compressed';
}

var sources = {
    js: ['app/components/angular/angular.min.js','app/modules/**/*.js'],
    sass: ['app/sass/main.sass'],
    html: [outputDir + '*.html'],
    json: [outputDir + 'js/*.json']
};


gulp.task('js', function() {
  return gulp.src(sources.js)
    .pipe(concat('app.js'))
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload())
});

gulp.task('compass', function() {
  return gulp.src(sources.sass)
    .pipe(
        compass({
          sass: 'app/sass',
          css: outputDir + 'css',
          image: 'app/media/img',
          require: ['susy'],
          style: sassStyle
        })
        .on("error", function(err) {
         gutil.log(err);
         this.emit("end");
        })
    )
    //.pipe(gulp.dest(outputDir + 'css'))
    .pipe(connect.reload())
});

gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    livereload: true
  });
});

gulp.task('html', function() {
  return gulp.src('app/*.html')
    .pipe(gulpif(env === 'production', minifyHTML()))
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload())
});

gulp.task('images', function() {
  return gulp.src('app/media/*.*')
    .pipe(gulpif(env === 'production', imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngcrush()]
    })))
    .pipe(gulp.dest(outputDir + 'media'))
    .pipe(connect.reload())
});

gulp.task('json', function() {
  return gulp.src('app/data/*.json')
    .pipe(gulpif(env === 'production', jsonminify()))
    .pipe(gulp.dest(outputDir + 'data'))
    .pipe(connect.reload())
});

gulp.task('lint', function() {
  return gulp.src('app/modules/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch(sources.js, ['lint', 'js']);
  gulp.watch('app/sass/*.sass', ['compass']);
  gulp.watch('app/*.html', ['html']);
  gulp.watch('app/data/*.json', ['json']);
  gulp.watch('app/media/*.*', ['images']);
});


gulp.task('default', ['html', 'lint', 'json', 'js', 'compass', 'images', 'connect', 'watch']);

