const { getKnexConfig } = require('../db.util');
describe('db.util', () => {
  it('should return correct config', () => {
    const configs = getKnexConfig();
    expect(configs).toEqual({
      client: 'postgresql',
      connection: expect.any(Object),
      pool: {
        min: expect.any(Number),
        max: expect.any(Number),
      },
    });
  });
});
