const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');

const config = require('./config')();

const PORT = process.env.PORT || 3000;

const app = express();

if (process.env.NODE_ENV === 'development')
  app.use(
    require('cors')({ credentials: true, origin: 'http://localhost:8080' })
  );

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 60 * 60 * 1000,
    keys: [config.cookie_secret]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./models/user')(mongoose);
require('./services/passport');
require('./services/mongoose');

require('./routes/auth')(app)(passport);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/../../build')));
  app.get('*', (request, response) => {
    response.redirect('/');
  });
}

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
