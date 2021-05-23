const { notify } = require('browser-sync');

let project_folder = "dist";
let source_folder = "#src";
let { src, dist } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create()
fileinclude = require("gulp-file-include");

let watch = gulp.parallel(build, browserSync);
let build = gulp.series(html);
let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
    },

    src: {
        html: source_folder + "/*.html",
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/*.ttf",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + project_folder + "/"

}


function browserSync(params) {
    browserSync.init({
        server: {
            basedir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src('src/**.html')
        .pipe(fileinclude({
            prefix: '@@'
        }))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}






exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;