const { insert, updateById, deleteById, findAll, todos } = require('../todo');
describe('Test todo model', () => {
  it('Should create todo & return inserted todo', () => {
    const inserted = insert({ id: 1, title: 'First Todo' });
    expect.assertions(3);
    expect(inserted).toEqual({ id: 1, title: 'First Todo', completed: false });
    expect(todos.length).toEqual(1);
    expect(todos[0]).toEqual({ id: 1, title: 'First Todo', completed: false });
  });

  it('Should update todo & return updated one', () => {
    // insert({ id: 1, title: 'First Todo' });
    const updated = updateById({ id: 1, title: 'Second Todo' });
    expect.assertions(4);
    expect(todos[0]).toEqual(updated);
    expect(updated.id).toEqual(1);
    expect(updated.title).toEqual('Second Todo');
    expect(updated.completed).toEqual(false);
  });

  it('Should return false if could not found todo item', () => {
    // insert({ id: 1, title: 'First Todo' });
    const updated = updateById({ id: 2, title: 'Second Todo' });
    expect(updated).toEqual(false);
  });

  it('Should delete todo with id', () => {
    // insert({ id: 1, title: 'First Todo' });
    const deleted = deleteById(1);
    expect.assertions(2);
    expect(deleted).toEqual(true);
    expect(todos.length).toEqual(0);
  });

  it('Should return false if could not found todo id', () => {
    insert({ id: 1, title: 'First Todo' });
    const deleted = deleteById(2);
    expect.assertions(2);
    expect(deleted).toEqual(false);
    expect(todos.length).toEqual(1);
  });

  it('Should return all todos', () => {
    insert({ id: 2, title: 'Second Todo' });
    const todoList = findAll();
    expect(todoList).toEqual(todos);
  });

  it('Should return all activated todos', () => {
    insert({ id: 3, title: 'Third Todo' });
    insert({ id: 4, title: '4th Todo' });
    updateById({ id: 2, completed: true });
    const todoList = findAll({ completed: false });
    expect(todoList.length).toEqual(3);
  });

  it('Should return all completed todos', () => {
    const todoList = findAll({ completed: true });
    expect(todoList.length).toEqual(1);
  });
});
