var gulp 			= require('gulp'),
	concat 			= require('gulp-concat'),
	sass 			= require('gulp-sass'),
	autoprefixer	= require('gulp-autoprefixer'),
	plumber			= require('gulp-plumber'),
	minifyCss		= require('gulp-minify-css'),
	sourceMap		= require('gulp-sourcemaps'),
	imageMin		= require('gulp-imagemin'),
	clean			= require('gulp-clean');

var path = {
	scss	: 'assets/scss/',
	css		: 'assets/css/',
	images	: 'assets/images/'
};

/*
 * Clean folder CSS
 */
gulp.task('cleanCss', function () {
	return gulp.src(path.css, {read: false})
		.pipe(clean());
});

/*
 * Compile Scss and concat/minify
 */
gulp.task('scss', ['cleanCss'], function () {
	return gulp.src(path.scss+'/**/*.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(concat('style.css'))
		.pipe(gulp.dest(path.css))
		.pipe(sourceMap.init())
		.pipe(minifyCss())
		.pipe(concat('style.min.css'))
		.pipe(sourceMap.write())
		.pipe(gulp.dest(path.css));
});

/*
 * Optim all images
 */
gulp.task('images', function () {
	return gulp.src(path.images+'/**/*')
		.pipe(imageMin())
		.pipe(gulp.dest(path.images));
})

/*
 * Watch Files
 */
gulp.task('watch', function() {
	gulp.watch(path.scss+'/**/*', ['scss']);
});

/*
 * Default task (just gulp)
 */
gulp.task('default', ['scss', 'watch']);