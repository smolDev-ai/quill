// Update with your config settings.
const { db, db_url, db_user } = require('./config/config');


module.exports = {

  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      database: db,
      user: db_user,
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  production: {
    client: 'pg',
    connection: db_url,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }

};