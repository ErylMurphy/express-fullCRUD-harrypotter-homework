
const promise = require("bluebird");
const pgp = require('pg-promise')();
const monitor = require("pg-monitor");

const connection = {
    host: 'localhost',
    port: 5432,
    database: 'hogwarts_crud'
}

const db = pgp(connection);

module.exports = db;
