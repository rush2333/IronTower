import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/index';
import {
  HashRouter,
} from 'react-router-dom'
import history from './history';
import globalStore from './globalStore'

const root = document.getElementById('root');

const render = (Com) => {
    ReactDOM.hydrate(
      <HashRouter>
        <Com history={history} globalStore={globalStore}/>
      </HashRouter>
    ,root)
};

render(App);

