/**
 * Created by b1ncer on 16/7/4.
 */
const calc = (start, end, duration, ease, begin, cb) => {
    cb(ease((new Date().getTime() - begin) / duration) * (end - start) + start);
};

export default function* Generator (from, to, duration, ease) {
    const begin = new Date().getTime();
    let res, fns = [];
    if (typeof from == 'number') {
        const start = from;
        const end = to;

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
                res = from.slice();
            }
        );

        from.forEach((v, k) => {
            const start = v;
            const end = to[k];
            if (start != end) {
                fns.push(
                    () => {
                        calc(start, end, duration, ease, begin, value => {
                            res[k] = value;
                        })
                    }
                )
            }
        });

    } else {

        fns.push(
            () => {
                res = Object.assign({}, from);
            }
        );

        for (const key in from) {
            const start = from[key];
            const end = to[key];

            if (start != end) {
                fns.push(
                    () => {
                        calc(start, end, duration, ease, begin, value => {
                            res[key] = value;
                        });
                    }
                );
            }
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