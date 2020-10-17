const knex = require('knex');
const knexfile = require('../knexfile');

const env = process.env.DB_ENV || 'development'

module.exports = knex(knexfile[env]);
