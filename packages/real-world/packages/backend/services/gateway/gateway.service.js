const ApiGateway = require('moleculer-web');
const { SERVICE_USER } = require('../../constants');

module.exports = {
  mixins: [ApiGateway],
  settings: {
    routes: [
      {
        port: 3000,
        path: '/api',
        authentication: false,
        autoAliases: false,
        aliases: {
          'GET /users': `${SERVICE_USER}.getAllUsers`,
        },
        // Use bodyparser modules
        bodyParsers: {
          json: { limit: '2MB' },
          urlencoded: { extended: true, limit: '2MB' },
        },
      },
    ],
  },
};
