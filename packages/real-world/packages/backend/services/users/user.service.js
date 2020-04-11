const { SERVICE_USER, TABLE_USER } = require('../../constants');

module.exports = {
  name: SERVICE_USER,
  mixins: [],
  actions: {
    getAllUsers: {
      cache: {
        keys: ['active'],
        ttl: 10,
      },
      params: {
        active: {
          type: 'string',
          optional: true,
        },
      },
      handler(ctx) {
        const { active } = ctx.params;
        return ctx.call(`db-${TABLE_USER}.find`, {
          where: { actFlg: active == 'true' },
        });
      },
    },
  },
};
