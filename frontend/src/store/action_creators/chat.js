
import * as chat from '../actions/chat';

export const loadInitial = () => socket => dispatch => {
  console.log(dispatch);
  socket.on('init', msgs =>
    dispatch({ type: chat.WRITE_MESSAGES, payload: msgs })
  );
};

export const writeMessage = msg => socket => dispatch => {
  socket.emit('writeMessage', msg);
};

export const rec = () => socket => dispatch => {
  socket.on('messageReceived', msgs =>
    dispatch({ type: chat.WRITE_MESSAGE, payload: msgs })
  );
};
