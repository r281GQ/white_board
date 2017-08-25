module.exports = app => {
  const { URL } = require('url');
  const redis = require('redis');
  const session = require('express-session');
  // const session = require('cookie-parser')
  const redisStore = require('connect-redis')(session);
  const config = require('./../config')();

  let store;

  // app.use(session({maxAge: 60*60*10000, keys: [config.cookie_secret]}))

  if (process.env.NODE_ENV === 'production') {
    console.log(process.env.REDISTOGO_URL);
    const myURL = new URL(process.env.REDISTOGO_URL);
    store = {
      host: myURL.hostname,
      port: myURL.port,
      db: myURL.username,
      pass: myURL.password,
      ttl: 260
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
      secure: true,
      path: '/'
    },
    secret: config.cookie_secret,
    store: new redisStore(store),
    saveUninitialized: true,
    resave: true,
    proxy: true
  };
app.set('trust proxy', 1)
  if (process.env.NODE_ENV !== 'production') {
    sessionConfig.cookie.secure = false;
    // sessionConfig.cookie.store = new redisStore({
    //   client: redis.createClient(),
    //   ttl: 260
    // });
  }
console.log(sessionConfig.store);
  app.use(session(sessionConfig));
  return sessionConfig.store;
  return process.env.NODE_ENV !== 'production'
    ? new redisStore({
        url: process.env.REDISTOGO_URL,
        ttl: 260
      })
    : new redisStore({
        client: redis.createClient(),
        ttl: 260
      });
};
