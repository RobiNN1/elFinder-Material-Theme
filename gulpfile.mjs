import gulp from 'gulp';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import clean_css from 'gulp-clean-css';
import replace from 'gulp-replace';
import rename from 'gulp-rename';
import package_json from './package.json' with {type: 'json'};

const paths = {
    less: 'src/less/*.less',
    src: 'src/less/theme*.less',
    dest: 'Material/css/'
};

const build = () => {
    return gulp.src(paths.src)
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(replace('{version}', package_json.version))
        .pipe(replace('{year}', String(new Date().getFullYear())))
        .pipe(gulp.dest(paths.dest))
        // Create *.min.css versions
        .pipe(clean_css())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.dest));
};

const watch = () => {
    gulp.watch(paths.less, build);
};

export {build, watch};
export default gulp.series(build, watch);
