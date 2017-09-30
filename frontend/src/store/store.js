import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk'

import auth from './reducers/auth';
import chat from './reducers/chat';


export default createStore(
  combineReducers({ auth, chat }),
  composeWithDevTools(applyMiddleware(thunk))
);
