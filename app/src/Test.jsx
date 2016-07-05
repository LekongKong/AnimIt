//chenyutong@baixing.com
import React, {Component, PropTypes} from 'react';

import Tween from './Tween';
import * as easing from './easing';

export default class Test extends Component {

    static propTypes = {};

    state = {
        left: 0
    };

    handleButton () {
        const func = this.refs.select.value;
        new Tween()
            .from(this.state.left)
            .to(innerWidth - 300)
            .curve(easing[func])
            .during(1000)
            .use(tweenData => {
                this.setState({left: tweenData});
            })
            .onEnd(() => {
                setTimeout(() => {
                    this.setState({left: 0});
                }, 500);
            })
            .start();
    }

    render() {
        const easings = Object.keys(easing);
        const options = [];
        for (let a of easings) {
            options.push(<option key={a} value={a}>{a}</option>);
        }
        return (
            <div>
                <div style={{height: 40, textAlign: 'center'}}>tween demo</div>
                <div style={{height: 100, marginTop: 40, position: 'relative'}}>
                    <div style={{backgroundColor: '#ff0000', width: 100, height: 100, position: 'absolute', left: this.state.left}}></div>
                </div>
                <div style={{textAlign: 'center'}}>
                    <select ref="select">
                        {options}
                    </select>
                    <button style={{marginTop: 40, marginLeft: 10}} onClick={this.handleButton.bind(this)}>have a try</button>
                </div>
            </div>
        )
    }
}