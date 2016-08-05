/**
 * Created by b1ncer on 16/8/3.
 */

import * as Easings from './core/easing';
import * as Tween from './core/core-tweens';
import * as Animation from './core/animation';
import * as FunnyTweens from './funny-tweens/index';

const anim = Animation.anim;

const TweenNumber = Tween.TweenNumber;

const TweenArray = Tween.TweenArray;

const TweenReference = Tween.TweenReference;

const TweenObject = Tween.TweenObject;

export {
    anim,
    TweenNumber,
    TweenArray,
    TweenReference,
    TweenObject,
    FunnyTweens,
    Easings
};