import initialState from './../initial_state';
import * as chat from '../actions/chat';

import { fromJS } from 'immutable';

export default (state = initialState.get('chat'), { type, payload }) => {
  switch (type) {
    case chat.WRITE_MESSAGE:
      return state.concat(payload);
    case chat.WRITE_MESSAGES:
      return fromJS(payload);
    default:
      return state;
  }
};
