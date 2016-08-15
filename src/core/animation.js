/**
 * Created by b1ncer on 16/8/2.
 */
export const anim = options => {

    const duration = options.duration;
    const delay = options.delay;
    const tweenInstance = options.tween;
    const onStart = options.onStart;
    const onUpdate = options.onUpdate;
    const onComplete = options.onComplete;
    let animFn;

    const inPromise = resolve => {
        animFn = tick(duration, (whenBegin) => {
            const now = new Date().getTime();
            let progress = duration ? (now - whenBegin) / duration : 1;
            progress = progress > 1 ? 1 : progress;
            const value = tweenInstance.get(progress);
            if (onUpdate) {
                onUpdate(value, progress, tweenInstance);
            }
        }, onComplete || resolve, onStart);

        if (delay) {
            setTimeout(animFn, delay);
        } else {
            animFn();
        }
    };

    const fn = function() {
        return new Promise(inPromise);
    };

    fn.stop = function() {
        animFn.stop();
    };

    return fn;
};

export default anim;

export const tick = (duration, fn, complete, start) => {
    let isStop = false;

    function runner (whenBegin) {
        fn(whenBegin);
        const now = new Date().getTime();
        if (now < whenBegin + duration && !isStop) {
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

    tickFn.stop = function() {
        isStop = true;
    };

    return tickFn;
};