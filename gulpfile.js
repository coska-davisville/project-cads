var gulp = require('gulp'),
    Server = require('karma').Server,
    gulpLoadPlugins = require('gulp-load-plugins'),
    mainBowerFiles = require('main-bower-files'),
    del = require('del');

var $ = gulpLoadPlugins();
var config = {
    distDir: './public/dist',
    tmpDir: './public/.tmp',
    bowerDir: './public/bower_components'
};

gulp.task('default', function() {

});

gulp.task('lint', function() {
    return gulp.src('public/app/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'))
        .pipe($.jshint.reporter('fail'))
        .on('error', function(err) {
            this.end();
        });
});

function startKarma(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function() {
        done();
    }).start();
}

gulp.task('test:lint', ['lint'], function(done) {
    startKarma(done);
});

gulp.task('test', function(done) {
    startKarma(done);
});


gulp.task('useref', function() {
    var userefAssets = $.useref.assets({
        transformPath: function(filePath) {
            return filePath.replace('/assets','');
        }
    });

    return gulp.src('public/*.html')
        .pipe(userefAssets)
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.minifyCss({processImport: false})))
        .pipe($.rev())
        .pipe(userefAssets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(gulp.dest(config.tmpDir))
});

gulp.task('html', ['useref'], function(cb) {
    return gulp.src([config.tmpDir + '/*.html', config.tmpDir + '/assets/**/*.*'])
        .pipe(gulp.dest(config.distDir))
        .on('end', function() {
            del(config.tmpDir);
        });
});

gulp.task('templates', function() {
    return gulp.src('public/app/**/*.html')
        .pipe(gulp.dest(config.distDir + '/app'));
});

gulp.task('images', function() {
    return gulp.src('public/images/**.*')
        .pipe(gulp.dest(config.distDir + '/images'))
});

gulp.task('fonts', function() {
    return gulp.src(mainBowerFiles().concat([
            config.bowerDir + '/font-awesome/fonts/*',
            config.bowerDir + '/bootstrap/fonts/*'
        ]))
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe(gulp.dest(config.distDir + '/fonts'));
});

gulp.task('extra', function() {
    return gulp.src([
            'public/*.*',
            '!public/*.html',
            '!public/.tmp'
        ], {
            dot: true
        })
        .pipe(gulp.dest(config.distDir));
});

gulp.task('clean', function() {
    return del([config.distDir, config.tmpDir]);
});

gulp.task('build', ['clean'], function() {
    gulp.start('build:static');
});

gulp.task('build:static', ['html', 'templates', 'images', 'fonts', 'extra'], function() {
    return gulp.src([config.distDir + '/*.html', config.distDir + '/**/*.js', config.distDir + '/**/*.css'])
        .pipe($.size({title: config.distDir, showFiles: true}));
});

gulp.task('build:lint', ['lint'], function() {
    gulp.start('build');
});
