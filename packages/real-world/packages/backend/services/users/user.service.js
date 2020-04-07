const { SERVICE_USER } = require('../../constants');

module.exports = {
  name: SERVICE_USER,
  actions: {
    sum: {
      params: {
        num1: 'string',
        num2: 'string',
      },
      handler(ctx) {
        // get params from ctx.
        const { num1, num2 } = ctx.params;
        return parseInt(num1) + parseInt(num2);
      },
    },
  },
};
