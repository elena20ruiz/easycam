
import React from 'react';
import App from './App';
import { install, applyUpdate } from 'offline-plugin/runtime';
import './style.css'

import {  AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';

const rootEl = document.getElementById('root');
render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;

    render(
      <AppContainer>
         <NextApp />
      </AppContainer>,
      rootEl
    );
  });
}


install({
  onUpdateReady: () => applyUpdate()
});