/**
 * Created by b1ncer on 16/8/3.
 */
import * as Easing from './core/easing';
import * as Tween from './core/core-tweens';
import * as Animation from './core/animation';
import * as Extra from './funny-tweens/index';

module.exports = options => {
    let animFn;
    let curve = options.curve;
    if (curve instanceof String) {
        curve = Easing[curve];
    }
    if (options.tween) {
        animFn =  Animation.anim(options);
    } else {
        if (options.target) {
            animFn = Animation.anim({
                tween: Tween.tweenReference({
                    target: options.target,
                    setter: options.setter
                }),
                ...options
            });
        } else {
            animFn = Animation.anim({
                tween: Array.isArray(options.to) ? Tween.tweenArray({
                    from: options.from,
                    to: options.to,
                    curve: curve
                }) : Tween.tweenNumber({
                    from: options.from,
                    to: options.to,
                    curve: curve
                }),
                ...options
            });
        }
    }
    return animFn;
};

module.exports = Object.assign(module.exports,
    {
        animation: Animation.anim,
        ...Tween,
        ...Easing,
        Extra
    }
);