var del = require('del');

var gulp = require('gulp'),
		gulpsync = require('gulp-sync')(gulp),
		gulpif = require('gulp-if'),
		changed = require('gulp-changed'),
		plumber = require('gulp-plumber'),
		nodemon = require('gulp-nodemon'),
		stylus = require('gulp-stylus'),
		autoprefixer = require('gulp-autoprefixer'),
		uglify = require('gulp-uglify'),
		jshint = require('gulp-jshint');


// vars Block

var Production = false;

// Paths Block

var paths = {
	stylus: {
		src: ['public/src/styl/*.styl'],
		dest: 'public/build/css'
	},
	scripts: {
		src: ['public/src/js/*.js'],
		dest: 'public/build/js'
	},
	nodemon: {
		ignore: ['public/*']
	},
	clean: {
		pub: ['public/build/css/*', 'public/build/js/*']
	}
}

// Loggers Block

var error_logger = function(error) {
	console.log([
		'',
		'---------- ERROR MESSAGE START ----------'.bold.red.inverse,
		'',
		(error.name.red + ' in ' + error.plugin.yellow),
		'',
		error.message,
		'----------- ERROR MESSAGE END -----------'.bold.red.inverse,
		''
	].join('\n'));
}

var watch_logger = function(event) {
	console.log('File ' + event.path.green + ' was ' + event.type.yellow + ', running tasks...');
}

// Tasks Block

gulp.task('clean', function() {
	del(paths.clean.pub);
});


gulp.task('nodemon', function() {
	nodemon({
		script: 'app.js',
		ext: 'js',
		ignore: paths.nodemon.ignore,
		env: { 'NODE_ENV': Production ? 'production' : 'development' },
	});
});


gulp.task('stylus', function () {
	gulp.src(paths.stylus.src)
			.pipe(changed(paths.stylus.dest))
			.pipe(plumber(error_logger))
			.pipe(stylus({
				compress: Production
			}))
			.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: !Production
			}))
			.pipe(gulp.dest(paths.stylus.dest));
});


gulp.task('scripts', function () {
	gulp.src(paths.scripts.src)
			.pipe(plumber(error_logger))
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish'))
			.pipe(changed(paths.scripts.dest))
			.pipe(gulpif(Production, uglify()))
			.pipe(gulp.dest(paths.scripts.dest));
});


gulp.task('watch', function() {
	gulp.watch(paths.scripts.src, ['scripts']).on('change', watch_logger);
	gulp.watch(paths.stylus.src, ['stylus']).on('change', watch_logger);
});


gulp.task('production', function () {
	Production = true;
});

// Run Block

gulp.task('default', gulpsync.sync(['clean', ['stylus', 'scripts']]));
gulp.task('build', gulpsync.sync(['production', 'clean', ['stylus', 'scripts']]));
gulp.task('dev', ['watch', 'nodemon']);
gulp.task('run', ['production', 'watch', 'nodemon']);