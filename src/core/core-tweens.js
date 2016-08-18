/**
 * Created by b1ncer on 16/7/5.
 */
const linear = t => t;

export const tweenNumber = options => {
    const from = options.from;
    const to = options.to;
    const curve = options.curve || linear;
    return progress => curve(progress) * (to - from) + from;
};

export const tweenArray = options => {
    const from = options.from;
    const to = options.to;
    const curve = options.curve || linear;
    return progress => {
        const res = [];
        for (let i = 0, j = from.length; i < j; i++) {
            res[i] = curve(progress) * (to[i] - from[i]) + from[i];
        }
        return res;
    };
};

export const tweenReference = options => {
    const target = options.target;
    const setter = options.setter;
    const visit = (setter, target) => {
        let fns = [];
        for (let key in setter) {
            if (setter[key] instanceof Function) {
                fns.push(
                    progress => {
                        target[key] = setter[key](progress);
                    }
                );
            } else {
                fns = fns.concat(visit(setter[key], target[key]))
            }
        }
        return fns;
    };
    const fns = visit(setter, target);
    return progress => {
        fns.forEach(fn => {
            fn(progress);
        });
        return target;
    };
};
