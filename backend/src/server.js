const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan')

const cookieParser = require('cookie-parser');

const config = require('./config')();


const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan('combined'))

app.use(cookieParser(config.cookie_secret))

require('./services/cors')(app);

const store = require('./services/session')(app);

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./models/user')(mongoose);

require('./services/mongoose');
require('./services/passport');

require('./routes/auth')(app)(passport);
require('./routes/static')(app)(express);

// app.listen(PORT, () =>
//   console.log(`Rest API and websockets started on port: ${PORT}`)
// );

require('./websockets/socket')(app)(store).listen(PORT, () =>
  console.log(`Rest API and websockets started on port: ${PORT}`)
);
