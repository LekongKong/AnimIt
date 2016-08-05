/**
 * Created by b1ncer on 16/7/5.
 */
import _typeof from './type';

const linear = t => t;

export class TweenNumber {

    from;

    to;

    curve = linear;

    constructor(options) {
        Object.assign(this, options);
        this.from = Number(this.from);
        this.to = Number(this.to);
    }

    get(progress) {
        return this.curve(progress) * (this.to - this.from) + this.from;
    }
}

export class TweenArray {

    from;

    to;

    curve = linear;

    value = [];

    constructor(options) {
        Object.assign(this, options);
    }

    get(progress) {
        for (let i = 0, j = this.from.length; i < j; i++) {
            this.value[i] = this.curve(progress) * (Number(this.to[i]) - Number(this.from[i])) + Number(this.from[i]);
        }
        return this.value;
    }
}

export class TweenReference {

    target;

    setter;

    fns;

    constructor(options) {
        Object.assign(this, options);
        this.fns = TweenReference.visit(this.setter, this.target);
    }

    static visit(setter, target) {
        let fns = [];
        for (let key in setter) {
            if (_typeof(setter[key].get) == 'function') {
                fns.push(
                    progress => {
                        target[key] = setter[key].get(progress);
                    }
                );
            } else {
                fns = fns.concat(TweenReference.visit(setter[key], target[key]))
            }
        }
        return fns;
    }

    get(progress) {
        this.fns.forEach(fn => {
            fn(progress);
        });
        return this.target;
    }
}
