import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/index'

const root = document.getElementById('root');

const render = (Com) => {
    ReactDOM.hydrate(<Com />,root)
};

render(App);

if(module.hot){
    module.hot.accept('./pages/index',() => {
        const nextApp = require('./pages').default;
        render(nextApp);
    })
}