/**
 * Created by b1ncer on 16/8/4.
 */
var AnimIt = require('../dist/anim-it.js');

var obj = {
    a: 'a',
    b: 1,
    c: {
        d: {
            e: {
                f: 100
            }
        }
    }
};

var tween = new AnimIt.TweenReference({
    target: obj,
    setter: {
        b: new AnimIt.TweenNumber({
            from: obj.b,
            to: 100
        }),
        c: {
            d: {
                e: {
                    f: new AnimIt.TweenNumber({
                        from: obj.c.d.e.f,
                        to: 0,
                        curve: AnimIt.Easings.outBack
                    })
                }
            }
        }
    }
});

console.log(tween.get(0.5));