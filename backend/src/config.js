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
        cookie_secret: process.env.COOKIE_SECRET
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
        cookie_secret: require('./../../config/config.json').dev.COOKIE_SECRET
      };
    default:
      return {
        google: {
          client_id: require('./../../config/config.json').dev.GOOGLE.CLIENT_ID,
          client_secret: require('./../../config/config.json').dev.GOOGLE
            .CLIENT_SECRET
        },
        mongodb: {
          uri: require('./../../config/config.json').dev.MONGODB.URI
        },
        cookie_secret: require('./../../config/config.json').dev.COOKIE_SECRET
      };
  }
};
