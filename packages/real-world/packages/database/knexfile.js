const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${NODE_ENV}` });

const MIGRATIONS_DIR = path.resolve(__dirname, 'migrations');
const SEEDS_DIR = path.resolve(__dirname, 'seeds', NODE_ENV);

const baseConfigs = {
  client: 'postgresql',
  connection: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    ssl: process.env.DATABASE_SSL,
  },
  pool: {
    min: +process.env.DATABASE_POOL_MIN,
    max: +process.env.DATABASE_POOL_MAX,
  },
  migrations: {
    directory: MIGRATIONS_DIR,
    tableName: 'knex_migrations',
    schemaName: 'public',
  },
  seeds: {
    directory: SEEDS_DIR,
  },
};

module.exports = {
  development: {
    ...baseConfigs,
  },

  staging: {
    ...baseConfigs,
  },

  test: {
    ...baseConfigs,
  },

  production: {
    ...baseConfigs,
  },
};
