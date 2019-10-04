const gulp = require('gulp')
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const imagemin = require('gulp-imagemin')

const scripts = require('./scripts')  
const styles = require('./styles')

//if running tasks
var devMode = false

gulp.task('imagemin', () => {
	gulp.src('./src/assets/*')
		.pipe(gulp.dest('./dist/images'))
		.pipe(browserSync.reload({
			stream: true
		}))
})

gulp.task('sass', () => {
	gulp.src(styles)
		.pipe(concat('main.css'))
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
})

// gulp.task('css', () => {
// 	gulp.src(styles)
// 		.pipe(concat('main.css'))
// 		.pipe(gulp.dest('./dist/css'))
// 		.pipe(browserSync.reload({
// 			stream: true
// 		}))
// })

gulp.task('js', () => {
	gulp.src(scripts)
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(browserSync.reload({
			stream: true
		}))
})

gulp.task('html', () => {
	gulp.src('./src/templates/**/*.html')
		.pipe(gulp.dest('./dist/'))
		.pipe(browserSync.reload({
			stream: true
		}))
})

gulp.task('build', () => {
	gulp.start(['sass', 'js', 'html', 'imagemin'])
})

gulp.task('browser-sync', () => {
	browserSync.init(null, {
		open: false,
		server: {
			baseDir: 'dist'
		}
	})
})

gulp.task('start', () => {
	devMode = true;
	gulp.start(['build', 'browser-sync'])
	gulp.watch(['./src/scss/**/*.css'], ['sass'])
	gulp.watch(['./src/js/**/*.js'], ['js'])
	gulp.watch(['./src/templates/**/*.html'], ['html'])
	gulp.watch(['./src/assets/*'], ['imagemin'])
})


