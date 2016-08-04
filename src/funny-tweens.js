/**
 * Created by b1ncer on 16/8/3.
 */
import _typeof from './type';

export class TweenConcatStr {

    str;

    curve;

    static is(options) {
        return _typeof(options.str) == 'string';
    }

    constructor(options) {
        Object.assign(this, options);
    }

    get(progress) {
        progress = this.curve(progress);
        progress = progress > 1 ? 1 : progress;
        progress = progress < 0 ? 0 : progress;
        return this.str.slice(0, Math.round(this.str.length * progress));
    }
}