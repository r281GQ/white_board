import io from 'socket.io-client';

class Socket {
  constructor() {
    this.socket = io(process.env.REACT_APP_SOCKET_IO_URL);
  }
}

export default new Socket();
