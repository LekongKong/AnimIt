/**
 * chenyutong@baixing.com
 * 入口文件
 * 加载基础的样式和做一些初始化工作
 */

//css
import 'normalize-css';
import '../asserts/css/app.css';

//polyfills
import 'babel-polyfill';

//load app
import React from 'react';
import ReactDOM from 'react-dom';

import Test from './Test.jsx';

const rootEl = document.createElement('div');
document.body.appendChild(rootEl);

ReactDOM.render(
    <Test />,
    rootEl
);
