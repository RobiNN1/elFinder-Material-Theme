const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const clean_css = require('gulp-clean-css');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const package_json = require('./package.json');

const paths = {
    less: 'Material/src/less/*.less',
    src: 'Material/src/less/theme*.less',
    dest: 'Material/css/'
};

const build = () => {
    return gulp.src(paths.src)
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(replace('{version}', package_json.version))
        .pipe(gulp.dest(paths.dest))
        // Create *.min.css versions
        .pipe(clean_css())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.dest));
};

const watch = () => {
    gulp.watch(paths.less, build);
};

exports.build = build;
exports.watch = watch;
exports.default = gulp.series(build, watch);
