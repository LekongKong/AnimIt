/**
 * Created by b1ncer on 16/8/4.
 */
var AnimIt = require('../dist/anim-it.js');

var target = {
    a: 'xx',
    b: 1
};

var obj = new AnimIt.TweenObject({
    target: target,
    to: {
        b: 300
    }
});

console.log(obj);