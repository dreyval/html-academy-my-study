var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleanCss = require('gulp-clean-css');

gulp.task('sass', function () {
	return gulp.src('app/sass/main.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function () {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/swiper/dist/js/swiper.min.js',
		'app/libs/magnific-popup/dis/jquery.magnific-popup.min.js'
	])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
});

gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});
gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function () {
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/*.js', browserSync.reload);
});