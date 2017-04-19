const gulp = require("gulp");
const apidoc = require('gulp-apidoc');
const jshint = require("gulp-jshint");
const stylish = require('jshint-stylish');
const paths = {
  'root': ["./**/*/*.js", "!node_modules/**/*.js", "!public/apidoc/**/*.js", "!coverage/**/*.js"]
};

gulp.task('default', () =>
  gulp.src(paths.root)
	.pipe(jshint('.jshintrc'))
	.pipe(jshint.reporter('jshint-stylish'))
);

gulp.task('doc', function(done){
  apidoc({
    src: "app/controllers",
    dest: "public/apidoc"
  },done);
});