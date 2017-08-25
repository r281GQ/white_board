const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan')
//
// const cookieParser = require('cookie-parser');

// const config = require('./config')();


// const session = require('cookie-session')
// const redisStore = require('connect-redis')(session);
const config = require('./config')();





const { URL } = require('url');
const redis = require('redis');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
// const config = require('./../config')();

let store;

// app.use(session({maxAge: 60*60*10000, keys: [config.cookie_secret]}))
//
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
  proxy:true
};

if (process.env.NODE_ENV !== 'production') {
  sessionConfig.cookie.secure = false;
  sessionConfig.cookie.store = new redisStore({
    client: redis.createClient(),
    ttl: 260
  });
}
// return null;
// console.log(sessionConfig.store);
// return sessionConfig.store;
// return process.env.NODE_ENV !== 'production'
//   ? new redisStore({
//       url: process.env.REDISTOGO_URL,
//       ttl: 260
//     })
//   : new redisStore({
//       client: redis.createClient(),
//       ttl: 260
//     });














const PORT = process.env.PORT || 3000;

const app = express();
app.enable('trust proxy');
// require('./services/cors')(app);
app.use(morgan('combined'))
app.use(bodyParser.json());
// app.use(cookieParser(config.cookie_secret))
app.use(session(sessionConfig));

// app.use(session({maxAge: 60*60*10000, keys: ['sdfsdfsd'], secure:false}))

console.log(app);

// const store = require('./services/session')(app);


app.use(passport.initialize());
app.use(passport.session());

require('./models/user')(mongoose);

require('./services/mongoose');
require('./services/passport');

require('./routes/auth')(app)(passport);
require('./routes/static')(app)(express);



app.listen(PORT, () =>
  console.log(`Rest API and websockets started on port: ${PORT}`)
);

// require('./websockets/socket')(app)(store).listen(PORT, () =>
//   console.log(`Rest API and websockets started on port: ${PORT}`)
// );
