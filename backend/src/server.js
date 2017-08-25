const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const PORT = process.env.PORT || 3000;

const app = express();

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

require('./websockets/socket')(app)(store).listen(PORT, () =>
  console.log(`Rest API and websockets started on port: ${PORT}`)
);
