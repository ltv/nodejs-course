const { KnexDbMixin } = require('moleculer-db-knex');

const { getKnexConfig } = require('../utils/db.util');

exports.DbMixin = (options) => {
  const { table, schema, idField } = options || {
    schema: 'public',
    idField: 'id',
  };
  if (!table) {
    throw new Error('Table is required but not mentioned in options');
  }
  const configs = getKnexConfig();
  return KnexDbMixin({
    schema,
    table,
    idField,
    knex: {
      configs,
    },
  });
};
