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
    jsBower: [
            'app/components/bower/jquery/dist/jquery.js',
            'app/components/bower/lodash/dist/lodash.js',
            'app/components/bower/jquery-mousewheel/jquery.mousewheel.js',
            'app/components/bower/angular/angular.js',
            'app/components/bower/tweenjs/build/tween.min.js',
            'app/components/bower/threejs/build/three.min.js',
            'app/components/bower/highcharts/highcharts.src.js',
            // 'app/components/bower/highcharts-ng/dist/highcharts-ng.js',
            'app/components/bower/requestAnimationFrame/app/requestAnimationFrame.js'
    ],
    jsCustom: [
            'app/components/custom/lodash-mixins.js',
            'app/components/custom/highcharts-ng-mod.js',
            'app/components/custom/highcharts-tooltips-options.js',
            'app/components/custom/webgl_globe/webgl_globe_mod.js',
            'app/components/custom/webgl_detector.js',
            'app/components/custom/start.tween.js'
    ],
    js: ['app/modules/**/*.js'],
    sass: ['app/sass/main.sass'],
    html: ['app/*.html'],
    json: ['app/data/*.json']
};

sources.js = [].concat(sources.jsBower, sources.jsCustom, sources.js);


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
    .pipe(connect.reload())
});

gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    livereload: false
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
  return gulp.src(['app/modules/*.js', 'app/app.js'].concat(sources.jsCustom))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch(sources.js, ['lint', 'js']);
  gulp.watch('app/sass/**/*.sass', ['compass']);
  gulp.watch('app/*.html', ['html']);
  gulp.watch('app/data/*.json', ['json']);
  gulp.watch('app/media/*.*', ['images']);
});


gulp.task('default', ['html', 'lint', 'json', 'js', 'compass', 'images', 'connect', 'watch']);

