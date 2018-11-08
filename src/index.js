import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/index';
import {
  HashRouter,
  Route, 
} from 'react-router-dom'
import globalStore from './globalStore'

const root = document.getElementById('root');

const render = (Com) => {
  ReactDOM.hydrate(
    <HashRouter>
      <Route render={props => <Com {...props} globalStore={globalStore} />} >
      </Route>
    </HashRouter>
    , root)
};

render(App);

