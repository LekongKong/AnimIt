/**
 * Created by b1ncer on 16/7/5.
 */
import _typeof from './type';

const linear = t => t;

class UnsupportedDataStruct extends Error {

    constructor(options) {
        super(`不支持的数据类型: ${JSON.stringify(options)}`);
    }
}

export class TweenNumber {

    from;

    to;

    curve = linear;

    static is(options) {
        const isFromNumber = _typeof(Number(options.from)) == 'number' && !isNaN(Number(options.from));
        const isToNumber = _typeof(Number(options.to)) == 'number' && !isNaN(Number(options.to));
        return isFromNumber && isToNumber;
    }

    constructor(options) {
        Object.assign(this, options);
        this.from = Number(this.from);
        this.to = Number(this.to);
    }

    get(progress) {
        return this.curve(progress) * (this.to - this.from) + this.from;
    }
}

export class TweenArray {

    from;

    to;

    curve = linear;

    value = [];

    static is(options) {
        const isFromArray = _typeof(options.from) == 'array';
        const isToArray = _typeof(options.to) == 'array';
        return isFromArray && isToArray && options.from.length === options.to.length;
    }

    constructor(options) {
        Object.assign(this, options);
    }

    get(progress) {
        for (let i = 0, j = this.from.length; i < j; i++) {
            this.value[i] = this.curve(progress) * (Number(this.to[i]) - Number(this.from[i])) + Number(this.from[i]);
        }
        return this.value;
    }
}

export class TweenObject {

    target;

    from;

    to;

    curve = linear;

    getter = {};

    static is(options) {
        const isFromNoneOrObject = !options.from || _typeof(options.from) == 'object';
        const isToObject = _typeof(options.to) == 'object';
        return options.target && isFromNoneOrObject && isToObject;
    }

    constructor(options, tweenClasses = BASE_TWEENS) {
        Object.assign(this, options);

        this.initFrom();

        this.initGetter(tweenClasses);
    }

    initFrom() {
        if (this.from) {
            for (let key in this.from) {
                this.target[key] = this.from[key];
            }
        }
    }

    initGetter(tweenClasses) {
        for (let key in this.to) {
            const childOption = {};
            childOption.from = this.target[key];
            childOption.to = this.to[key];
            childOption.curve = this.curve;
            const NoneObjectTween = pickTweenClass(childOption, tweenClasses);
            if (NoneObjectTween) {
                this.getter[key] = new NoneObjectTween(childOption);
            } else {
                childOption.target = this.target[key];
                childOption.from = this.from[key];
                if (TweenObject.is(childOption)) {
                    this.getter[key] = new TweenObject(childOption, tweenClasses);
                } else {
                    throw new UnsupportedDataStruct(childOption);
                }
            }
        }
    }

    get(progress) {
        for (let key in this.getter) {
            this.target[key] = this.getter[key].get(progress);
        }
        return this.target;
    }
}

const pickTweenClass = (options, TweenClasses) => {
    for (let i = 0, j = TweenClasses.length; i < j; i++) {
        const TweenClass = TweenClasses[i];
        if (TweenClass.is(options)) {
            return TweenClass;
        }
    }
    return null;
};

const BASE_TWEENS = [TweenNumber, TweenArray, TweenObject];

export const registerTweenClass = tweenClass => {
    BASE_TWEENS.unshift(tweenClass);
};

export const TweenFactory = (options, customs = []) => {
    if (!options.curve) {
        options.curve = linear;
    }
    const TweenClasses = customs.concat(BASE_TWEENS);
    const TweenClass = pickTweenClass(options, TweenClasses);
    if (!TweenClass) {
        throw new UnsupportedDataStruct(options);
    }
    return new TweenClass(options, TweenClasses);
};

export default TweenFactory;