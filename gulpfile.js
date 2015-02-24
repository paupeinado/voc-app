var gulp	= require('gulp'),	rjs		= require('gulp-requirejs'),	less	= require('gulp-less'),	minify	= require('gulp-minify-css'),	watch	= require('gulp-watch'),	rename	= require('gulp-rename');gulp.task('buildJS', function() {	rjs({		name: "main",		out: "main.js",		baseUrl: "./app/js",		mainConfigFile: "./app/js/config.js",	})	.pipe(gulp.dest('./dist/js'));});gulp.task('buildLESS', function(){	gulp.src('./app/css/less/bootstrap.less')		.pipe(less())		.pipe(rename('style.css'))		.pipe(gulp.dest('./app/css'));});gulp.task('minifyCSS', function(){	gulp.start('buildLESS', function(){		gulp.src('./app/css/*.css')			.pipe(minify())			.pipe(gulp.dest('./dist/css'));	});});gulp.task('watch', function () {	gulp.src('./app/css/less/*.less')		.pipe(watch('./app/css/less/*.less', function(){			gulp.start('buildLESS');		}));});gulp.task('default', ['watch'], function() { });gulp.task('build', ['buildJS', 'minifyCSS'], function() { });