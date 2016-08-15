/**
 * Created by b1ncer on 16/8/4.
 */
var AnimIt = require('../dist/anim-it.js');
var raf = require('raf');
raf.polyfill();

var anim = AnimIt.anim;

var animation = anim({
    tween: new AnimIt.TweenNumber({
        from: 0,
        to: 100
    }),
    duration: 1000,
    onUpdate: function(value) {
        console.log(value);
    },
    onComplete: function() {
        console.log('complete');
    }
});

setTimeout(function() {
    animation.stop();
}, 500);

animation();

console.log(animation.stop);