import 'semantic-ui-css/semantic.min.css';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store/store';
import App from './containers/app'

/*eslint no-undef: "off" */
const DOCUMENT_ROOT = document.getElementById('root');

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  DOCUMENT_ROOT
);
