/**
 * Created by b1ncer on 16/7/4.
 */
export const linear = t => {
    return t;
};

export const inQuad = t => {
    return t*t;
};

export const outQuad = t => {
    return -(t-=1)*t+1;
};

export const inOutQuad = t => {
    if ((t/=.5) < 1) return .5*t*t;
    return -.5*((--t)*(t-2) - 1);
};

export const inCubic = t => {
    return t*t*t;
};

export const outCubic = t => {
    return ((--t)*t*t + 1);
};

export const inOutCubic = t => {
    if ((t/=.5) < 1) return .5*t*t*t;
    return .5*((t-=2)*t*t + 2);
};

export const inQuart = t => {
    return t*t*t*t;
};

export const outQuart = t => {
    return -((--t)*t*t*t - 1);
};

export const inOutQuart = t => {
    if ((t/=.5) < 1) return .5*t*t*t*t;
    return -.5 * ((t-=2)*t*t*t - 2);
};

export const inQuint = t => {
    return t*t*t*t*t;
};

export const outQuint = t => {
    return ((--t)*t*t*t*t + 1);
};

export const inOutQuint = t => {
    if ((t/=.5) < 1) return .5*t*t*t*t*t;
    return .5*((t-=2)*t*t*t*t + 2);
};

export const inSine = t => {
    return -1.0*Math.cos(t * (Math.PI/2)) + 1.0;
};

export const outSine = t => {
    return Math.sin(t * (Math.PI/2));
};

export const inOutSine = t => {
    return -.5*(Math.cos(Math.PI*t) - 1);
};

export const inExpo = t => {
    return (t===0) ? 0.0 : Math.pow(2, 10 * (t - 1));
};

export const outExpo = t => {
    return (t===1.0) ? 1.0 : (-Math.pow(2, -10 * t) + 1);
};

export const inOutExpo = t => {
    if (t===0) return 0.0;
    if (t===1.0) return 1.0;
    if ((t/=.5) < 1) return .5 * Math.pow(2, 10 * (t - 1));
    return .5 * (-Math.pow(2, -10 * --t) + 2);
};

export const inCirc = t => {
    return -(Math.sqrt(1 - t*t) - 1);
};

export const outCirc = t => {
    return Math.sqrt(1 - (--t)*t);
};

export const inOutCirc = t => {
    if ((t/=.5) < 1) return -.5 * (Math.sqrt(1 - t*t) - 1);
    return .5 * (Math.sqrt(1 - (t-=2)*t) + 1);
};

export const inElastic = t => {
    let s=1.70158;let p=0;let a=1.0;
    if (t===0) return 0.0;  if (t===1) return 1.0;  if (!p) p=.3;
    s = p/(2*Math.PI) * Math.asin(1.0/a);
    return -(a*Math.pow(2,10*(t-=1)) * Math.sin((t-s)*(2*Math.PI)/ p));
};

export const outElastic = t => {
    let s=1.70158;let p=0;let a=1.0;
    if (t===0) return 0.0;  if (t===1) return 1.0;  if (!p) p=.3;
    s = p/(2*Math.PI) * Math.asin(1.0/a);
    return a*Math.pow(2,-10*t) * Math.sin((t-s)*(2*Math.PI)/p) + 1.0;
};

export const inOutElastic = t => {
    let s=1.70158;let p=0;let a=1.0;
    if (t===0) return 0.0;  if ((t/=.5)===2) return 1.0;  if (!p) p=(.3*1.5);
    s = p/(2*Math.PI) * Math.asin(1.0/a);
    if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin((t-s)*(2*Math.PI)/p));
    return a*Math.pow(2,-10*(t-=1)) * Math.sin((t-s)*(2*Math.PI)/p)*.5 + 1.0;
};

export const inBack = (t, s) => {
    if (s === undefined) s = 1.70158;
    return t*t*((s+1)*t - s);
};

export const outBack = (t, s) => {
    if (s === undefined) s = 1.70158;
    return ((--t)*t*((s+1)*t + s) + 1);
};

export const inOutBack = (t, s) => {
    if (s === undefined) s = 1.70158;
    if ((t/=.5) < 1) return .5*(t*t*(((s*=(1.525))+1)*t - s));
    return .5*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2);
};

export const inBounce = t => {
    return 1.0 - outBounce(1.0-t);
};

export const outBounce = t => {
    if (t < (1/2.75)) {
        return (7.5625*t*t);
    } else if (t < (2/2.75)) {
        return (7.5625*(t-=(1.5/2.75))*t + .75);
    } else if (t < (2.5/2.75)) {
        return (7.5625*(t-=(2.25/2.75))*t + .9375);
    } else {
        return (7.5625*(t-=(2.625/2.75))*t + .984375);
    }
};

export const inOutBounce = t => {
    if (t < .5) return inBounce(t*2) * .5;
    return outBounce(t*2-1.0) * .5 + .5;
};