const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");

// Compile Sass
gulp.task("sass", function () {
  return gulp
    .src(["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

// Move JS Files to SRC
gulp.task("js", function () {
  return gulp
    .src([
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/tether/dist/js/tether.min.js",
    ])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});

//Watch SASS & Serve
gulp.task(
  "serve",
  gulp.series("sass", function () {
    browserSync.init({
      server: "./src",
    });

    gulp.watch(
      ["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"],
      gulp.series("sass")
    );
    gulp.watch("src/*.html").on("change", browserSync.reload);
  })
);

// Move Font Awesome Fonts folder to src
gulp.task("fonts", function () {
  return gulp
    .src("node_modules/font-awesome/fonts/*")
    .pipe(gulp.dest("src/fonts"));
});

// Move font awesome cs file
gulp.task("fa", function () {
  return gulp
    .src("node_modules/font-awesome/css/font-awesome.min.css")
    .pipe(gulp.dest("src/css"));
});

gulp.task("default", gulp.parallel("js", "serve", "fa", "fonts"));
