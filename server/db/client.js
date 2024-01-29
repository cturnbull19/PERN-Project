const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://workoutlibrary_user:dya6K73o0yLWCThJ43MiqqQmmQ88134E@dpg-cmrs37gl5elc73ak9kf0-a/workoutlibrary';

const client = new Client({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = client;