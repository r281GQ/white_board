import 'semantic-ui-css/semantic.min.css';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';

import store from './store/store';
import { history } from './store/reducers/router';
import App from './containers/app';

/*eslint no-undef: "off" */
const DOCUMENT_ROOT = document.getElementById('root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  DOCUMENT_ROOT
);
