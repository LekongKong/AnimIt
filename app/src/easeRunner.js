/**
 * chenyutong@baixing.com
 */
export const runner = tween => {
    tween.update();
    if (!tween.isEnd) {
        requestAnimationFrame(runner.bind(null, tween));
    }
};

export default runner;
