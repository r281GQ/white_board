import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import auth from './reducers/auth';

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  combineReducers({ auth }),
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);


// sagaMiddleware.run()
