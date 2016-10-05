//
// dependencies
//

var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var purifyCss = require('gulp-purifycss');
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');
var gulpif = require('gulp-if');
var del = require('del');
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');



//
// paths
//

var paths = {
	styles: {
		src: './stylesheets/**.scss',
		dest: './public/css'
	},
	templates: {
		src: './templates/**.pug',
		dest: './public'
	},
	js: {
		src: './javascripts/index.js',
		dest: './public/js'
	},
	images: {
		src: './images/img',
		dest: './public/img'
	},
	sprite: {
		src: './images/sprite',
		dest: './public/img'
	}
}



//
// styles
//

gulp.task('styles', function() {
	return gulp.src(paths.styles.src)
		.pipe(gutil.env.env === 'dev' ? sourcemaps.init() : gutil.noop())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false,
			remove: false
		}))
		.pipe(gutil.env.env === 'dev' ? sourcemaps.write('./maps') : gutil.noop())
		.pipe(gutil.env.env === 'prod' ? cleanCss({
			compatibility: 'ie10'
		}) : gutil.noop())
		.pipe(gutil.env.env === 'prod' ? purifyCss([
			'./public/js/index.js',
			'./public/*.html']) : gutil.noop())
		.pipe(gulp.dest(paths.styles.dest))
});



//
// templates
//

gulp.task('templates', function() {
	gulp.src(paths.templates.src)
		.pipe(plumber())
		.pipe(pug({
			pretty: '\t'
		}))
		.pipe(plumber.stop())
		.pipe(gulp.dest(paths.templates.dest))
});



//
// images
//

gulp.task('images', function() {
	return gulp.src(paths.images.src)
		.pipe(imagemin())
		.pipe(gulp.dest(paths.images.dest));
});



//
// sprite
//

gulp.task('sprite', function () {
	return sprity.src({
		src: paths.sprite.src,
		style: './_sprite.scss',
		name : 'sprite-main',
		processor: 'sass',
		'style-type': 'scss',
		cssPath : '../img/',
		orientation: 'binary-tree',
		margin : 0,
	})
	.pipe(imagemin([imageminPngquant({
		quality: '90-95'
	})]))
	.pipe(gulpif('*.png', gulp.dest('./dist/img/'), gulp.dest('./stylesheets/vendor/')))
});



//
// clean /public
//

gulp.task('clean:public', function () {
	return del([
		'./public'
	]);
});



//
// watch
//

gulp.task('watch', function() {
	gulp.watch(paths.styles.src, ['styles']);
	gulp.watch(paths.templates.src, ['templates']);
});
