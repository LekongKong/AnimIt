/**
 * Created by b1ncer on 16/7/5.
 */
import generator from './generator';

export default class Tween {

    fromData;

    toData;

    duration;

    easeFunc;

    setter;

    from (f) {
        if (typeof f != 'number') throw new Error('Invalid param: "from" must be a number!');
        this.fromData = f;
        return this;
    }

    to (t) {
        if (typeof t != 'number') throw new Error('Invalid param: "to" must be a number!');
        this.toData = t;
        return this;
    }

    during (d) {
        if (typeof d != 'number') throw new Error('Invalid param: "during" must be a number!');
        this.duration = d;
        return this;
    }

    curve (easeFunc) {
        this.easeFunc = easeFunc;
        return this;
    }

    use (setter) {
        this.setter = setter || console.log;
        return this;
    }

    onEnd (callback) {
        this.endCallback = callback || function () {};
        return this;
    }

    start (tick) {
        tick = tick || requestAnimationFrame;
        const endFunc = this.endCallback;
        if (!this.easeFunc) {
            this.easeFunc = t => {
                return t;
            };
        }
        const gen = generator(this.fromData, this.toData, this.duration, this.easeFunc);
        function run (generator, setter) {
            const res = generator.next();
            setter(res.value);
            if (!res.done) {
                tick(run.bind(this, generator, setter));
            } else {
                endFunc();
            }
        }
        run(gen, this.setter);
    }
}