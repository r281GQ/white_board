module.exports = app => store => {
  const server = require('http').createServer(app);
  const socketServer = require('socket.io')(server);
// socketServer.set('origins', '*:*');
  require('./auth')(socketServer)(store);

  socketServer.on('connection', client => {
    console.log(client.request.user);
    console.log(`member joined`);
  });

  return server;
};
