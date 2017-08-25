module.exports = socketServer => store => {
  const passportSocketIo = require('passport.socketio');
  const cookieParser = require('cookie-parser');

  const config = require('./../config')();

  socketServer.use(
    passportSocketIo.authorize({
      // cookieParser,
      key: 'connect.sid',
      secret: config.cookie_secret,
      store,
      success: (data, accept) => {
        console.log('success');
        console.log(data.user);
        accept(null, true);
      },
      fail: (data, message, error, accept) => console.log(message)
    })
  );
};
