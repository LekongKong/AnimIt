/**
 * Created by b1ncer on 16/8/5.
 */
import {tweenArray} from '../core/core-tweens';
import {outputCSSMatrix, inputCSSMatrix, interpret, build} from './Transform';

export {inputCSSMatrix, interpret};

export const tweenCSSTransform = options => {
    const from = Object.assign({
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        skew: [0, 0, 0],
        scale: [1, 1, 1]
    }, options.from);
    const to = Object.assign({}, options.to);
    const curve = options.curve || (t => t);
    const getter = {};
    for (let key in to) {
        this.getter[key] = tweenArray({
            from: from[key],
            to: to[key],
            curve: curve
        });
    }
    return progress => {
        const res = {};
        for (let key in getter) {
            res[key] = getter[key](progress);
        }
        return outputCSSMatrix(build(Object.assign({}, from, res)));
    }
};

export default tweenCSSTransform;