/**
 * Created by b1ncer on 16/7/4.
 */
const calc = (start, end, duration, ease, begin, cb) => {
    cb(ease((new Date().getTime() - begin) / duration) * (end - start) + start);
};

export default function* generator (from, to, duration, ease) {
    const begin = new Date().getTime();
    let start, end, res, fns = [];
    if (typeof from == 'number') {
        start = from;
        end = to;

        fns.push(
            () => {
                res = 'inited';
            }
        );

        fns.push(
            () => {
                calc(start, end, duration, ease, begin, value => {
                    res = value;
                });
            }
        );

    } else if (Array.isArray(from)) {

        fns.push(
            () => {
                res = [];
            }
        );

        for (let i = 0, j = from.length; i < j; i++) {
            start = from[i];
            end = to[i];

            fns.push(
                () => {
                    calc(start, end, duration, ease, begin, value => {
                        res.push(value);
                    });
                }
            );
        }
    } else {

        fns.push(
            () => {
                res = {};
            }
        );

        for (const key in from) {
            start = from[key];
            end = to[key];

            fns.push(
                () => {
                    calc(start, end, duration, ease, begin, value => {
                        res[key] = value;
                    });
                }
            );
        }
    }
    while (true) {
        if (new Date().getTime() - begin >= duration) {
            return to;
        }

        fns.forEach(fn => {
            fn();
        });

        yield res;
    }
}