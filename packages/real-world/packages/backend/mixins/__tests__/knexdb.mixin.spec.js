const { DbMixin } = require('../knexdb.mixin');

describe('DbMixin', () => {
  it('Should create mixin with options', () => {
    const dbMixin = DbMixin({ table: 'myTable' });

    expect(dbMixin).toBeTruthy();
  });

  it('Should throw exception if provide options without `table`', () => {
    const createMixin = () => {
      DbMixin({ schema: 'usr' });
    };

    expect(createMixin).toThrowError(
      new Error('Table is required but not mentioned in options')
    );
  });
});
