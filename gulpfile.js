var gulp = require('gulp');
var Server = require('karma').Server;
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var jshint = require('gulp-jshint');

var config = {
    distDir: './public/dist',
    tmpDir: './public/.tmp',
    bowerDir: './public/bower_components'
};

gulp.task('default', function() {
  // place code for your default task here
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function() {
        done();
    }).start();
});

gulp.task('jshint', function() {
    return gulp.src('public/app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'))
});


gulp.task('useref', function() {
    var userefAssets = useref.assets({
        transformPath: function(filePath) {
            return filePath.replace('/assets','');
        }
    });

    return gulp.src('public/*.html')
        .pipe(userefAssets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(rev())
        .pipe(userefAssets.restore())
        .pipe(useref())
        .pipe(revReplace())
        .pipe(gulp.dest(config.tmpDir))
});

gulp.task('images', function() {
    return gulp.src('public/images/**.*')
        .pipe(gulp.dest(config.distDir + '/images'))
});

gulp.task('fonts', function() {
    return gulp.src([config.bowerDir + '/font-awesome/fonts/**.*', config.bowerDir + '/bootstrap/fonts/**.*'])
        .pipe(gulp.dest(config.distDir + '/fonts'));
});

gulp.task('copy', ['useref'], function() {
    return gulp.src([config.tmpDir + '/*.html', config.tmpDir + '/assets/dist/**/*.*'])
        .pipe(gulp.dest(config.distDir));
});

gulp.task('copy:dist', ['copy', 'images', 'fonts'], function(cb) {
    del(config.tmpDir, cb);
});

gulp.task('clean:dist', function(callback) {
    del.sync([config.distDir, config.tmpDir], callback);
});


gulp.task('build', ['clean:dist', 'copy:dist']);


gulp.task('lint', ['jshint'], function() {
    gulp.start('test');
});
