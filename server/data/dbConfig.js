const knex = require('knex');
const { dbEnv } = require('../config/config');
const config = require('../knexfile.js')[dbEnv];




module.exports = knex(config);

