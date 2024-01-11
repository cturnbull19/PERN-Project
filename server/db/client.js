const { Client } = require('pg');
const dbName = 'workoutlibrary';
const client = new Client(`postgres://localhost54321/${workoutlibrary}`);

module.exports = client;