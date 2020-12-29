const knex = require('knex');
const { dbEnv } = require('../config/config');
const config = require('../knexfile.js')[dbEnv];

console.log(config)


module.exports = knex(config);

