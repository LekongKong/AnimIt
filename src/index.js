/**
 * Created by b1ncer on 16/8/3.
 */

import * as easing from './easing';
import * as Transform from './Transform';
import * as Tween from './Tween';
import * as Animation from './animation';

export const anim = Animation.anim;

export const registerCustomTweenClass = Tween.registerTweenClass;

export const TweenNumber = Tween.TweenNumber;

export const TweenArray = Tween.TweenArray;

export const TweenObject = Tween.TweenObject;

export const Easings = easing;