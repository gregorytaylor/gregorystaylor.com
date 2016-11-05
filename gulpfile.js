//
// dependencies
//

var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var es = require('event-stream');
var rename = require('gulp-rename');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
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
var imageminJpegtran = require('imagemin-jpegtran');



//
// paths
//

var paths = {
	styles: {
		src: {
			watch: './stylesheets/**/*.scss',
			build: './stylesheets/app.scss'
		},
		dest: './docs/css'
	},
	templates: {
		src: {
			watch: './templates/**/*.pug',
			build: './templates/*.pug'
		},
		dest: './docs'
	},
	js: {
		src: './javascripts/app.js',
		dest: './docs'
	},
	images: {
		src: './images/img',
		dest: './docs/img'
	},
	sprite: {
		src: './images/sprite',
		dest: {
			img: './docs/img',
			scss: './stylesheets/'
		}
	},
	fonts: {
		src: './fonts/**.*',
		dest: './docs/css/fonts'
	}
}



//
// styles
//

gulp.task('styles', function() {
	return gulp.src(paths.styles.src.build)
		.pipe(gutil.env.env === 'dev' ? sourcemaps.init() : gutil.noop())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer({
			browsers: ['last 3 versions'],
			cascade: false,
			remove: false
		}))
		.pipe(gutil.env.env === 'dev' ? sourcemaps.write('./maps') : gutil.noop())
		.pipe(gutil.env.env === 'prod' ? cleanCss({
			compatibility: 'ie10'
		}) : gutil.noop())
		.pipe(gutil.env.env === 'prod' ? purifyCss([
			'./docs/js/app.js',
			'./docs/*.html']) : gutil.noop())
		.pipe(gulp.dest(paths.styles.dest))
});



//
// templates
//

gulp.task('templates', function() {
	gulp.src(paths.templates.src.build)
		.pipe(plumber())
		.pipe(pug({
			pretty: '\t'
		}))
		.pipe(plumber.stop())
		.pipe(gulp.dest(paths.templates.dest))
});



//
// js
//

gulp.task('js', function() {
    // Entry points
    var files = [
        './javascripts/app.js'
    ];
    // Create a stream array
    var tasks = files.map(function(entry) {
        return browserify({ entries: [entry], debug: true})
            .bundle()
            .pipe(source(entry))
		    .pipe(buffer())
		    .pipe(gutil.env.env === 'dev' ? sourcemaps.init({loadMaps: true}) : gutil.noop())
            .pipe(rename({
            	dirname: 'js'
            }))
            .pipe(gutil.env.env === 'prod' ? stripDebug() : gutil.noop())
            .pipe(gutil.env.env === 'prod' ? uglify() : gutil.noop())
            .pipe(gutil.env.env === 'dev' ? sourcemaps.write('/map') : gutil.noop())
            .pipe(gulp.dest(paths.js.dest)); 
        });
    return es.merge.apply(null, tasks);
});


//
// images
//

gulp.task('images', function() {
	return gulp.src(paths.images.src)
		.pipe(imagemin([imageminJpegtran({
			progressive: true
		})]))
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
	.pipe(gulpif('*.png', gulp.dest(paths.sprite.dest.img), gulp.dest(paths.sprite.dest.scss)))
});


//
// images
//

gulp.task('fonts', function() {
	return gulp.src(paths.fonts.src)

		.pipe(gulp.dest(paths.fonts.dest));
});



//
// clean /docs
//

gulp.task('clean:docs', function () {
	return del([
		'./docs'
	]);
});



//
// watch
//

gulp.task('watch', function() {
	gulp.watch(paths.styles.src.watch, ['styles']);
	gulp.watch(paths.templates.src.watch, ['templates']);
});
