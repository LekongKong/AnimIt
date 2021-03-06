# AnimIt
*AnimIt* 是一个可扩展的补间(插值)动画库,你可以借助它轻松实现牛逼的动画效果.

### 目标
本项目的目标是使用最新的浏览器规范实现高性能，高可扩展的补间动画库。

### 初体验
```javascript
var el = document.getElementById('cube');

var animation = AnimIt({
	target: el.style,
	setter: {
		opacity: new AnimIt.tweenNumber({
			from: Number(window.getComputedStyle(el).opacity),
			to: 0.2,
			curve: AnimIt.outBack
		})
	},
	delay: 1000,
	duration: 1000
});

animation();

```
![初体验](https://raw.githubusercontent.com/LekongKong/AnimIt/master/examples/demo1.gif)  
[Live example on JSFiddle](https://jsfiddle.net/b1ncer/0tdn6of2/)

### 安装
```
npm install --save animit
```

### 使用
##### 生命周期函数
```javascript
var cubeEl = document.getElementById('cube');

var animation = AnimIt({
	from: 0,
	to: innerWidth - 100,
	curve: AnimIt.outBounce,
	duration: 1000,
	onUpdate: function(value) {
		cubeEl.style.left = value+'px';
	},
	onComplete: function() {
		cubeEl.style.backgroundColor = 'red';
	}
});

animation();

```

你可以定下动画的初始值和终值,然后在 onUpdate 函数里获取插值,并将插值赋给动画对象.  
![生命周期](https://raw.githubusercontent.com/LekongKong/AnimIt/master/examples/demo2.gif)  
[Live example on JSFiddle](https://jsfiddle.net/b1ncer/2LLxkfu7/)

##### 不仅仅对 Number 插值,通过使用不同的 Tween 类,可对任何类型的值做插值动画.
*插值 CSS Transform 动画*
```javascript
var cubeEl = document.getElementById('cube');

var animation = AnimIt({
	target: cubeEl.style,
	setter: {
		transform: AnimIt.Extra.TweenCSSTransform.default({
			to: {
				translate: [innerWidth - 200, 0, 0],
				rotate: [0, 0, Math.PI * 10]
			},
			curve: AnimIt.outBack
		})
	},
	duration: 1000,
	delay: 1000
});

animation();
```

使用内置的 TweenCSSTransform,可以把类似 {translate, rotate, skew, scale} 形式的 Transform 对象转换成浏览器接受的 CSS Transform 字符串.  
![CSS Transform](https://raw.githubusercontent.com/LekongKong/AnimIt/master/examples/demo3.gif)  
[Live example on JSFiddle](https://jsfiddle.net/b1ncer/a313x1yb/)

##### 使用标准 Promise 依次播放动画.
```javascript
var animation = AnimIt({
	target: cubeEl.style,
	setter: {
		transform: AnimIt.Extra.TweenCSSTransform.default({
			to: {
				translate: [innerWidth - 200, 0, 0],
				rotate: [0, 0, Math.PI * 10]
			},
			curve: AnimIt.outBack
		})
	},
	duration: 1000
});

var animation2 = AnimIt({
	target: cube2El.style,
	setter: {
		transform: AnimIt.Extra.TweenCSSTransform.default({
			to: {
				translate: [innerWidth - 200, 0, 0],
				rotate: [0, 0, Math.PI * 10]
			},
			curve: AnimIt.outBack
		})
	},
	duration: 1000,
	delay: 100
});

animation().then(animation2);
```

anim 函数返回一个标准 Promise,可以借助 Promise API 写出优雅的动画序列.  
![Promise](https://raw.githubusercontent.com/LekongKong/AnimIt/master/examples/demo4.gif)  
[Live example on JSFiddle](https://jsfiddle.net/b1ncer/qeqrcnb2/)

##### 通过自定义 Tween 扩展,轻松实现任何你想要的动画效果.
```javascript
var str = "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.Declarative views make your code more predictable and easier to debug.";
var area = document.getElementById('area');

function tweenConcatStr(str) {
	return function(progress) {
        progress = progress > 1 ? 1 : progress;
        progress = progress < 0 ? 0 : progress;
		return str.slice(0, Math.round(str.length * progress));
	};
}

AnimIt({
	tween: tweenConcatStr(str),
	duration: 10000,
	onUpdate: function(value) {
		area.value = value;
	}
})();
```

动手实现一个 Tween 扩展非常简单,只要保证你的 Tween 类有一个 get(progress) 函数即可.   
get(progress) 函数接受一个 progress 参数,该参数代表当前动画执行的进度([0, 1]),并返回根据进度计算出的插值.
可以看到我们仅使用相当少的代码便实现了*打字机*效果.  
![Custom](https://raw.githubusercontent.com/LekongKong/AnimIt/master/examples/demo5.gif)  
[Live example on JSFiddle](https://jsfiddle.net/b1ncer/98Ljeah4/)

##### 想象我们还能做到什么
![Rainbow](https://raw.githubusercontent.com/LekongKong/AnimIt/master/examples/demo6.gif)  
[Live example on JSFiddle](https://jsfiddle.net/b1ncer/uuhv65dk/)

### 模块规范
*AnimIt* 遵循 UMD 规范，即：兼容 AMD，CMD 规范并可以全局变量 *AnimIt* 的形式将 ./dist/anim-it.min.js 直接引入 html 文件中。

### 依赖
*AnimIt* 核心代码不依赖任何第三方库,但是会用到一些较新的 Api,为了兼容低版本的浏览器,你可能需要引入相应的 Polyfill:

* [Promise] (https://github.com/stefanpenner/es6-promise)

* requestAnimationFrame (https://github.com/chrisdickinson/raf)

* Object.assign

* Extra 中 TweenCSSTransform 库目前依赖一个第三方库 *xcssmatrix* 来把 CSSTransform 字符串转成 Array 的形式，之后的版本会移除该依赖。

### TODOS（欢迎贡献代码）

* Api 文档

* 单元测试

* 移除对 xcssmatrix 的依赖

* extra 部分代码从核心库分离

### License

The MIT License.
