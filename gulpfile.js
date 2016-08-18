/**
 * gulp 工作流
 * 执行文件变更监听，启动 live-reload 服务器，编译(测试)代码等
 */

var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');

var webpack = require('webpack-stream');

var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

/**
 * 用户接口
 */

//编译项目代码
gulp.task('compile', function() {
	var dist = './dist';

	return webpack(require('./webpack.config.js'))
		.pipe(gulp.dest(dist))
		.pipe(uglify(dist))
		.pipe(rename({extname: '.min.js'}))
		.pipe(gulp.dest(dist));

});

//测试脚本
gulp.task('test', function () {

});
