const ENVIRONMENT = process.env.NODE_ENV;

const TEST = 'test';
const PRODUCTION = 'production';
const DEVELOPMENT = 'development';

module.exports = () => {
  switch (ENVIRONMENT) {
    case PRODUCTION:
      return {
        google: {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET
        },
        mongodb: {
          uri: process.env.MONGODB_URI
        },
        cookie_secret: process.env.COOKIE_SECRET,
        socket_io_uri: 'https://white-board-react.herokuapp.com/'
      };
    case DEVELOPMENT:
      return {
        google: {
          client_id: require('./../../config/config.json').dev.GOOGLE.CLIENT_ID,
          client_secret: require('./../../config/config.json').dev.GOOGLE
            .CLIENT_SECRET
        },
        mongodb: {
          uri: require('./../../config/config.json').dev.MONGODB.URI
        },
        cookie_secret: require('./../../config/config.json').dev.COOKIE_SECRET,
        socket_io_uri: require('./../../config/config.json').dev.SOCKET_IO_URI
      };
    default:
      return {
        google: {
          client_id: require('./../../config/config.json').test.GOOGLE
            .CLIENT_ID,
          client_secret: require('./../../config/config.json').test.GOOGLE
            .CLIENT_SECRET
        },
        mongodb: {
          uri: require('./../../config/config.json').test.MONGODB.URI
        },
        cookie_secret: require('./../../config/config.json').test.COOKIE_SECRET,
        socket_io_uri: require('./../../config/config.json').test.SOCKET_IO_URI
      };
  }
};
