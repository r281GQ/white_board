module.exports = app => store => {
  const server = require('http').createServer(app);
  const socketServer = require('socket.io')(server);

  require('./auth')(socketServer)(store);

  socketServer.on('connection', client => {
    client.emit('init', ['dsfgdfg', '78978978']);
    console.log(client.request.user);
    console.log(`member joined`);
    client.on('writeMessage', msg => {
      console.log(msg);
      socketServer.emit('messageReceived', msg);

    });
    client.on('disconnect', ()=> console.log('disc'))
  });

  return server;
};
