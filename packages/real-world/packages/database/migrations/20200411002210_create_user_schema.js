exports.up = function (knex, Promise) {
  return knex.schema.raw('CREATE SCHEMA IF NOT EXISTS usr;'); // Profile Module
};

exports.down = function (knex, Promise) {
  return knex.schema;
};
