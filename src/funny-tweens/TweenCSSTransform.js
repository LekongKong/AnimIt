/**
 * Created by b1ncer on 16/8/5.
 */
import {TweenArray} from '../core/Tween';
import {outputCSSMatrix, inputCSSMatrix, interpret, build} from './Transform';

export {inputCSSMatrix, interpret};

export default class TweenCSSTransform {

    curve;

    from = {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        skew: [0, 0, 0],
        scale: [1, 1, 1]
    };

    to;

    getter = {};

    constructor(options) {
        this.from = Object.assign(this.from, options.from);
        this.to = Object.assign({}, this.to, options.to);
        this.curve = options.curve;
        for (let key in this.to) {
            this.getter[key] = new TweenArray({
                from: this.from[key],
                to: this.to[key],
                curve: this.curve
            });
        }
    }

    get(progress) {
        const tempValue = {};
        for (let key in this.getter) {
            tempValue[key] = this.getter[key].get(progress);
        }
        return outputCSSMatrix(build(Object.assign({}, this.from, tempValue)));
    }
}