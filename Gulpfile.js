const gulp = require("gulp");
const jshint = require("gulp-jshint");
const stylish = require('jshint-stylish');
const paths = {
    'root': ["./**/*/*.js", "!node_modules/**/*.js", "!apidoc/**/*.js", "!coverage/**/*.js"]
};

gulp.task('default', () =>
    gulp.src(paths.root)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
);
