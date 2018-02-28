module.exports = app => store => {
  const server = require('http').createServer(app);
  const socketServer = require('socket.io')(server);
  const mongoose = require('mongoose');

  require('./auth')(socketServer)(store);

  socketServer.on('connection', client => {
    client.on('disconnect', () =>
      socketServer.emit('userLeft', client.request.user.email)
    );
  });

  return server;
};
