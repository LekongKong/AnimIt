/**
 * Created by b1ncer on 16/8/4.
 */
var AnimIt = require('../dist/anim-it.js');
var raf = require('raf');
raf.polyfill();

var tweenNumber = AnimIt.tweenNumber;
var tween = tweenNumber({
    from: 0,
    to: 100
});
console.log(tween(0.5));

var tweenArray = AnimIt.tweenArray;
tween = tweenArray({
    from: [0, 0, 20],
    to: [100, 100, 0]
});
console.log(tween(0.5));

var target = {a: 100, b: 300, c: {f: [300, 700], t: 'qqqq'}};
var tweenReference = AnimIt.tweenReference;
tween = tweenReference({
    target: target,
    setter: {
        a: tweenNumber({
            from: 100,
            to: 1000
        }),
        b: tweenNumber({
            from: 300,
            to: 200
        }),
        c: {f: tweenArray({
            from: [100, 100],
            to: [1000, 1000]
        })}
    }
});
tween(0.5);
console.log(target);

var anim = AnimIt({
    from: 300,
    to: 1000,
    onUpdate: function(value) {
        console.log(value);
    },
    duration: 1000
});

anim().then(function() {
    console.log('complete');
}, function(reason) {
    console.log(reason);
});

setTimeout(anim.stop.bind(null, 'why stopped?'), 500);