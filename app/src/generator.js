/**
 * Created by b1ncer on 16/7/4.
 */
const cal = (start, end, duration, ease, delta) => {
    return ease(delta / duration) * (end - start) + start;
};

export default function* generator (from, to, duration, ease) {
    const begin = new Date().getTime();
    while (true) {
        const now = new Date().getTime();
        const delta = now - begin;
        if (delta >= duration) {
            return to;
        }
        let start, end, res;
        if (typeof from == 'number') {
            start = from;
            end = to;
            res = cal(start, end, duration, ease, delta);
        } else if (Array.isArray(from)) {
            res = [];
            for (let i = 0, j = from.length; i < j; i++) {
                start = from[i];
                end = to[i];
                if (typeof start == 'number' && typeof end == 'number') {
                    res[i] = cal(start, end, duration, ease, delta);
                }
            }
        } else {
            res = {};
            for (const key in from) {
                start = from[key];
                end = to[key];
                if (typeof start == 'number' && typeof end == 'number') {
                    res[key] = cal(start, end, duration, ease, delta);
                }
            }
        }
        yield res;
    }
}