import * as auth from '../actions/auth';
import * as socket from '../actions/socket';
import request from '../../services/request';

export const login = loginInformation => async dispatch => {
  try {
    const loginInfo = await request.post(
      '/api/auth/local/login',
      loginInformation
    );
    dispatch({ type: auth.LOGIN_SUCCESS, payload: loginInfo });
    dispatch({ type: socket.CONNECT });
  } catch (e) {
    console.log(e);
  }
};

export const logout = () => dispatch => {
  dispatch({ type: socket.DISCONNECT });
  dispatch({ type: auth.LOG_OUT });
};
