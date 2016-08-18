/**
 * Created by b1ncer on 16/8/5.
 */
export const tweenConcatStr = options => {
    const str = options.str;
    const curve = options.curve || (t => t);
    return progress => {
        progress = curve(progress);
        progress = progress > 1 ? 1 : progress;
        progress = progress < 0 ? 0 : progress;
        return str.slice(0, Math.round(str.length * progress));
    }
};

export default tweenConcatStr;