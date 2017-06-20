/*
 * Dependencias
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var useref = require('gulp-useref');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var del = require('del');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var replace = require('gulp-replace');
var rename = require('gulp-rename');

/*
 Rutas del proyecto
 *
 */
var config_local = require('./app/config/local.json');
var config_pruebas = require('./app/config/pruebas.json');
var config_produccion = require('./app/config/produccion.json');
var path = {
    all: 'app/*',
    html: 'app/views/**/*.html',
    index_html: 'app/index.html',
    js_main: 'app/js/**/*.js',
    js_components: 'app/bower_components/**/*.js',
    css: 'app/css/**/*.css',
    images: 'app/images/**/*.+(png|jpg|jpeg|gif)',
    fonts_awesome: 'app/bower_components/font-awesome/fonts/**/*',
    ionicons: 'app/bower_components/Ionicons/fonts/**/*',
    bootstrap: 'app/bower_components/bootstrap/fonts/**/*',
    ui_grid: 'app/bower_components/angular-ui-grid/**/*',
    config_file: 'app/config/config.js',
    config_dest: 'app/js/configuration',
    ico: 'app/favicon.ico',
    _404: 'app/404.html'
};

/*
 * Configuración de las tareas
 */

gulp.task('clean:dist', function () {
    return del.sync('dist');
});

gulp.task('js_css', function () {
    return gulp.src(path.index_html)
            .pipe(useref())
            .pipe(gulpif('*.js', uglify()))
            .pipe(gulpif('*.css', cssnano()))
            .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function () {
    return gulp.src([path.fonts_awesome,path.ionicons,path.bootstrap,path.ui_grid])
            .pipe(gulp.dest('dist/fonts'));
});

gulp.task('html', function () {
    return gulp.src(path.html)
            .pipe(gulp.dest('dist/views'));
});

gulp.task('rename_html', function () {
    return gulp.src(path.html)
            .pipe(rename({extname: '.phtml'}))
            .pipe(gulp.dest('dist/views'));
});

gulp.task('images', function () {
    return gulp.src(path.images)
            //.pipe(cache(imagemin()))
            .pipe(gulp.dest('dist/images'));
});

gulp.task('resto', function () {
    return gulp.src([path.ico, path._404])
            .pipe(gulp.dest('dist'));
});

gulp.task('config:local', function () {
    return gulp.src(path.config_file)
            .pipe(replace('@@apiEndpoint', config_local.apiEndpoint))
            .pipe(replace('@@secure', config_local.secure))
            .pipe(gulp.dest(path.config_dest));
});

gulp.task('config:pruebas', function () {
    return gulp.src(path.config_file)
            .pipe(replace('@@apiEndpoint', config_pruebas.apiEndpoint))
            .pipe(replace('@@secure', config_pruebas.secure))
            .pipe(gulp.dest(path.config_dest));
});

gulp.task('config:pruebas_dom', function () {
    return gulp.src(path.config_file)
            .pipe(replace('@@apiEndpoint', config_pruebas_dom.apiEndpoint))
            .pipe(replace('@@secure', config_pruebas_dom.secure))
            .pipe(gulp.dest(path.config_dest));
});

gulp.task('config:produccion', function () {
    return gulp.src(path.config_file)
            .pipe(replace('@@apiEndpoint', config_produccion.apiEndpoint))
            .pipe(replace('@@secure', config_produccion.secure))
            .pipe(gulp.dest(path.config_dest));
});

gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback);
});

gulp.task('build:local', function (callback) {
    runSequence('clean:dist',
            ['config:local',
                'js_css',
                'fonts',
                'html',
                'images',
                'resto'
            ],
            callback
            );
});

gulp.task('build:localmin', function (callback) {
    runSequence('clean:dist',
        ['config:local',
            'js_css',
            'html'
        ],
        callback
    );
});

gulp.task('build:pruebas', function (callback) {
    runSequence('clean:dist',
            ['config:pruebas',
                'js_css',
                'fonts',
                'html',
                'images',
                'resto'
            ],
            callback
            );
});

gulp.task('build:produccion', function (callback) {
    runSequence('clean:dist',
            ['config:produccion',
                'js_css',
                'fonts',
                'html',
                'images',
                'resto'
            ],
            callback
            );
});

/*
 *
 Servidor browserSync
 *
 */
gulp.task('browserSync', function () {
    browserSync.init({
        port: 3005,
        server: "app"
    });
});

gulp.task('serve', function (callback) {
    runSequence('config:local',
            ['browserSync'],
            callback
            );
    gulp.watch(path.all, browserSync.reload);

});


