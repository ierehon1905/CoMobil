import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

document.addEventListener(
  'touchmove',
  (event) => {
    if (event.scale !== 1) {
      event.preventDefault();
    }
  },
  false,
);

let lastTouchEnd = 0;
document.addEventListener(
  'touchend',
  (event) => {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  },
  false,
);

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
