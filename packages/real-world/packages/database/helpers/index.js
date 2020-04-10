const DEFAULT_MUTATION_SET_OPTS = {
  creUsrId: true,
  updUsrId: true,
  creDt: true,
  updDt: true,
};

const DEFAULT_BASE_FLAG_OPTS = {
  actFlg: true,
  delFlg: true,
};

exports.mutationSet = (
  knex,
  tb,
  options = {
    creUsrId: true,
    updUsrId: true,
    creDt: true,
    updDt: true,
  }
) => {
  const { creUsrId, updUsrId, creDt, updDt } = {
    ...DEFAULT_MUTATION_SET_OPTS,
    ...options,
  };
  if (creUsrId) tb.integer('creUsrId').comment('Create User Id');
  if (updUsrId) tb.integer('updUsrId').comment('Create User Id');
  if (creDt)
    tb.timestamp('creDt').defaultTo(knex.fn.now()).comment('Create Date');
  if (updDt)
    tb.timestamp('updDt').defaultTo(knex.fn.now()).comment('Update Date');
  return tb;
};

exports.baseFlag = (tb, options = { actFlg: true, delFlg: true }) => {
  const { actFlg, delFlg } = { ...DEFAULT_BASE_FLAG_OPTS, ...options };
  if (actFlg) tb.boolean('actFlg').defaultTo(true).comment('Active Flag');
  if (delFlg) tb.boolean('delFlg').defaultTo(false).comment('Delete Flag');
  return tb;
};

exports.up = function (knex, Promise) {};
exports.down = function (knex, Promise) {};
