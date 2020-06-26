// Update with your config settings.
const { database } = require('./config/config');


module.exports = {

  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: database,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  production: {
    client: 'pg',
    connection: database,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }

};