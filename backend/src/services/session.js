module.exports = app => {
  const { URL } = require('url');
  const redis = require('redis');
  const session = require('express-session');
  const redisStore = require('connect-redis')(session);
  const config = require('./../config')();

  let store;

  if (process.env.NODE_ENV === 'production') {
    const myURL = new URL(process.env.REDISTOGO_URL);
    store = {
      host: myURL.hostname,
      port: myURL.port,
      db: myURL.username,
      pass: myURL.password
    };
  } else {
    store = {
      client: redis.createClient(),
      ttl: 260
    };
  }

  let sessionConfig = {
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      secure: true
    },
    secret: config.cookie_secret,
    store: new redisStore(store),
    saveUninitialized: false,
    resave: false
  };

  if (process.env.NODE_ENV !== 'production') {
    sessionConfig.cookie.secure = false;
    // sessionConfig.cookie.store = new redisStore({
    //   client: redis.createClient(),
    //   ttl: 260
    // });
  }

  app.use(session(sessionConfig));
  return store;
  // return process.env.NODE_ENV !== 'production'
  //   ? new redisStore({
  //       url: process.env.REDISTOGO_URL,
  //       ttl: 260
  //     })
  //   : new redisStore({
  //       client: redis.createClient(),
  //       ttl: 260
  //     });
};
