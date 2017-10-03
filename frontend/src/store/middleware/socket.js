import io from 'socket.io-client';

export default function() {
  let socket = null;

  return store => next => action => {
    switch (action.type) {
      case 'CONNECT':
        if (socket != null) {
          socket.close();
        }

        socket = io(process.env.REACT_APP_SOCKET_IO_URL);
        socket.on('init', msgs =>
          store.dispatch({ type: 'WRITE_MESSAGES', payload: msgs })
        );
        socket.on('messageReceived', msg =>
          store.dispatch({ type: 'WRITE_MESSAGE', payload: msg })
        );

        break;

      case 'DISCONNECT':
        if (socket != null) {
          socket.close();
        }
        socket = null;
        break;

      case 'SEND_CHAT_MESSAGE':
        socket.emit('writeMessage', action.payload);
        break;

      default:
        return next(action);
    }
  };
}
