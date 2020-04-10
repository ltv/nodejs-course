const { mutationSet, baseFlag } = require('../helpers');

exports.up = function (knex, Promise) {
  return knex.schema.withSchema('usr').createTable('User', function (tb) {
    tb.increments('usrId').comment('User Id');
    tb.string('usrNm').unique().comment('Username');
    tb.string('usrEml').unique().comment('User Email');
    tb.string('usrPwd').comment('User Password');

    baseFlag(tb);
    mutationSet(knex, tb);

    tb.comment('User');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema;
};
