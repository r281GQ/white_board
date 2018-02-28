import initialState from './../initial_state';
import * as chat from '../actions/chat';

import { fromJS } from 'immutable';

export default (state = initialState.get('chat'), { type, payload }) => {
  switch (type) {
    case 'ADD_USER':
      return state.update('users', value => value.push(fromJS(payload)));
    case 'REMOVE_USER':
      return state.update('users', value =>
        value.remove(value.find(toFind => toFind === value))
      );
    case chat.WRITE_MESSAGE:
      return state.update('messages', value => value.push(payload));
    case chat.WRITE_MESSAGES:
      return state.set('messages', fromJS(payload));
    default:
      return state;
  }
};
