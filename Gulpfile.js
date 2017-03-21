const gulp = require("gulp");
const jshint = require("gulp-jshint");
const stylish = require('jshint-stylish');
const paths = {
    'root': ["./**/*.js", "!node_modules/**/*.js"]
};

gulp.task('default', ['jshint']);

gulp.task("lint", () => {
    gulp.src(paths.root)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

