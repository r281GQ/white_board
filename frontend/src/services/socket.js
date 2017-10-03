import io from 'socket.io-client';

class Socket {
  constructor() {
    this.socket = io(process.env.REACT_APP_SOCKET_IO_URL);
    this.socket.on('init', msgs => console.log(msgs));
  }
}

export default new Socket();
