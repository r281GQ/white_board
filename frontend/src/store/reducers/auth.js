import initialState from './../initial_state';
import * as auth from '../actions/auth';

export default (state = initialState.get('auth'), { type, payload }) => {
  switch (type) {
    case auth.LOGIN_SUCCESS:
      return state.set('isAuthenticated', true);
    case auth.LOG_OUT:
      return state.set('isAuthenticated', false);
    default:
      return state;
  }
};
