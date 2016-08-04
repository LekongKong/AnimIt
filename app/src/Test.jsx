//chenyutong@baixing.com
import React, {Component, PropTypes} from 'react';
import dat from 'dat.gui/build/dat.gui';
import * as Transform from './Transform';
import {TweenConcatStr} from './funny-tweens';
import * as AnimIt from './index';
const anim = AnimIt.anim;

AnimIt.registerCustomTweenClass(TweenConcatStr);

export default class Test extends Component {

    static propTypes = {};

    state = {
        str: ''
    };

    constructor(...args) {
        super(...args);
        const self = this;

        this.testData = new function() {
            this.curve = 'linear';
            this.test1 = function() {
                self.refs.div.style.transform = Transform.outputCSSMatrix(Transform.identity);
                const targetStyle = self.refs.div.style;
                anim({
                    from: Transform.translate(0, 0),
                    to: Transform.translate(500, 0),
                    curve: AnimIt.Easings[this.curve],
                    duration: 700,
                    //delay: 1000,
                    onUpdate: value => {
                        targetStyle.transform = Transform.outputCSSMatrix(value);
                    }
                })().then(anim({
                    target: targetStyle,
                    from: {opacity: 1},
                    to: {opacity: 0},
                    duration: 400
                })).then(anim({
                    target: targetStyle,
                    to: {opacity: 1},
                    duration: 600
                })).then(anim({
                    target: targetStyle,
                    from: Transform.translate(500, 0),
                    to: Transform.multiply(
                        Transform.translate(0, 0),
                        Transform.rotateZ(Math.PI * 9)
                    ),
                    curve: AnimIt.Easings[this.curve],
                    duration: 700,
                    onUpdate: value => {
                        targetStyle.transform = Transform.outputCSSMatrix(value);
                    }
                }));

            }.bind(this);
            this.test2 = function() {
                const str = '来一串长长又长长的字符串来看看bounce的效果把!';
                anim({
                    str: str,
                    duration: 700,
                    curve: AnimIt.Easings.outBounce,
                    onUpdate: value => {
                        self.setState({str: value});
                    }
                })();
            };
        };
        const gui = new dat.GUI();
        gui.add(this.testData, 'curve', Object.keys(AnimIt.Easings));
        gui.add(this.testData, 'test1');
        gui.add(this.testData, 'test2');
    }

    render() {
        return (
            <div style={{
                width: 600,
                marginLeft: 300,
                backgroundColor: '#000'
            }}>
                <div style={{height: 40, textAlign: 'center'}}>tween demo</div>
                <div style={{height: 100, marginTop: 40, position: 'relative'}}>
                    <div ref="div" style={{backgroundColor: '#ff0000', left: 30, width: 40, height: 40, borderRadius: '20%', position: 'absolute'}}></div>
                </div>
                <div style={{color: 'white', paddingBottom: 40}}>
                    {this.state.str}
                </div>
            </div>
        )
    }
}