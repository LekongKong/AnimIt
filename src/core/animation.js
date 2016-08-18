/**
 * Created by b1ncer on 16/8/2.
 */
export const tick = (duration, fn, complete, start, stop) => {
    let isStop = false;

    function runner (whenBegin) {
        fn(whenBegin);
        const now = new Date().getTime();
        if (isStop) {
            if (stop) {
                stop(isStop);
            }
        } else if (now < whenBegin + duration) {
            requestAnimationFrame(runner.bind(null, whenBegin));
        } else {
            if (complete) {
                complete();
            }
        }
    }

    const tickFn =  function() {
        const begin = new Date().getTime();
        if (start) {
            start();
        }
        requestAnimationFrame(runner.bind(null, begin));
    };

    tickFn.stop = function(reason = true) {
        isStop = reason;
    };

    return tickFn;
};

export const anim = options => {
    const duration = options.duration;
    const delay = options.delay;
    const tween = options.tween;
    const onStart = options.onStart;
    const onUpdate = options.onUpdate;
    const onComplete = options.onComplete;
    const onStop = options.onStop;
    let animFn;

    const inPromise = (resolve, reject) => {
        animFn = tick(duration, (whenBegin) => {
            const now = new Date().getTime();
            let progress = duration ? (now - whenBegin) / duration : 1;
            progress = progress > 1 ? 1 : progress;
            const value = tween(progress);
            if (onUpdate) {
                onUpdate(value, progress);
            }
        }, onComplete || resolve, onStart, onStop || reject);

        if (delay) {
            setTimeout(animFn, delay);
        } else {
            animFn();
        }
    };

    const fn = function() {
        return new Promise(inPromise);
    };

    fn.stop = function(reason) {
        animFn.stop(reason);
    };

    return fn;
};

export default anim;