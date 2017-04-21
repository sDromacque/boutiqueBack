const gulp = require("gulp");
const apidoc = require('gulp-apidoc');
const jshint = require("gulp-jshint");
const stylish = require('jshint-stylish');
const paths = {
  'root': ["./**/*/*.js", "!node_modules/**/*.js", "!public/apidoc/**/*.js", "!coverage/**/*.js"]
};
const eslint = require('gulp-eslint');

gulp.task('lint', function() {
  return gulp.src(paths.root)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('doc', function(done){
  apidoc({
    src: "app/controllers",
    dest: "public/apidoc"
  },done);
});