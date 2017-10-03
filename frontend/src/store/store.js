import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import d from './middleware/socket'
import auth from './reducers/auth';
import chat from './reducers/chat';
import { router, routerMiddlewareInstance } from './reducers/router';

export default createStore(
  combineReducers({ auth, chat, router }),
  composeWithDevTools(applyMiddleware(thunk, routerMiddlewareInstance, d()))
);
