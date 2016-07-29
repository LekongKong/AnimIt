/**
 * gulp 工作流
 * 执行文件变更监听，启动 live-reload 服务器，编译(测试)代码等
 */

var gulp = require('gulp');
var path = require('path');
var fs = require('fs');

var child_process = require('child_process');

var webpack = require('gulp-webpack');
var runSequence = require('run-sequence');
var named = require('vinyl-named');
var install = require('gulp-install');

//从npm安装依赖
gulp.task('install', function() {

	return gulp.src(['./package.json'])
		.pipe(install());
});

//编译项目代码
gulp.task('compile', function() {
	var dist = './dist';

	return webpack(require('./webpack.config.js'))
		.pipe(gulp.dest(dist));

});

//清空dest文件夹
gulp.task('clean', function() {
	var dist = './dist';

	//递归删除文件夹
	function cleanDir(dir, p) {
		p = path.join(p, dir);
		if (!fs.existsSync(p)) {
			return;
		}
		try {
			fs.rmdirSync(p);	//尝试删除空文件夹
		} catch(e) {
			try {
				fs.unlinkSync(p);	//尝试删除文件
			} catch(e) {
				fs.readdirSync(p).forEach(function(dir) {	//遍历文件夹下的文件
					cleanDir(dir, p);
				});
			}
		}
	}

	return cleanDir(dist, __dirname);
});

/**
 * 用户接口
 */

//编译代码,并开启服务器和监听任务,开发用
gulp.task('default', function() {
	process.env.NODE_ENV = JSON.stringify('development');

    return runSequence('compile');
});

//部署
gulp.task('release', function () {
	process.env.NODE_ENV = JSON.stringify('production');

	return runSequence('clean', 'install', 'compile');
});

//服务器
gulp.task('server', function() {
	//看了下puer的实现很奇怪,不明白为什么node下也需要用闭包函数包变量.最后的结果是,在task外require(puer)会与webpack冲突.
	child_process.exec('puer -a ./route.js -d ./dist');
});

//测试脚本
gulp.task('test', function () {

});
