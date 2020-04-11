const { TABLE_USER } = require('../../../constants');
const { DbMixin } = require('../../../mixins/knexdb.mixin');

module.exports = {
  name: `db-${TABLE_USER}`,
  mixins: [DbMixin({ schema: 'usr', table: 'User', idField: 'usrId' })],
};
