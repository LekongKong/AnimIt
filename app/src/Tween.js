/**
 * Created by b1ncer on 16/7/5.
 */
import generator from './generator';

const linear = t => t;

export default class Tween {

    from;

    to;

    during;

    curve = linear;

    onUpdate;

    onEnd;

    constructor(options) {
        if (typeof options.during != 'number') {
            throw new Error('Invalid param: during');
        }
        Object.assign(this, options);
        this.gen = new generator(this.from, this.to, this.during, this.curve);
    }

    update() {
        const res = this.gen.next();
        if (this.onUpdate instanceof Function) {
            this.onUpdate(res.value);
        }
        if (res.done) {
            this.isEnd = true;
            if (this.onEnd instanceof Function) {
                this.onEnd();
            }
        }
    }
}