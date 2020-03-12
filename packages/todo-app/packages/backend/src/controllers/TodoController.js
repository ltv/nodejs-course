// - Create Todo (Create single todo for each time) (`/api/createTodo`)
// - Update Todo & Mark this todo as completed (`/api/updateTodo`)
// - Get All Todo (`/api/todos`)
// - Get All completed todos (`/api/todos` with params: `completed: boolean`)
// - Get All activated todos (`/api/todos` with params: `completed: false`)
// - Delete Todo (`/api/deleteTodo`)
// - Clear Completed todos (`/api/clearCompleted`)
const todoModel = require('../models/todo');

// id, title, completed
exports.createTodo = (req, res) => {
  const todo = req.body;
  const inserted = todoModel.insert(todo);
  res.json(inserted);
};

exports.updateTodo = (req, res) => {
  const todo = req.body;
  const updated = todoModel.updateById(todo);
  res.json(updated);
};

exports.getTodoList = (req, res) => {
  const { completed } = req.body;
  const todos =
    completed === undefined
      ? todoModel.findAll()
      : todoModel.findAll({ completed: !!completed });
  res.json(todos);
};

exports.deleteTodo = (req, res) => {
  const { id } = req.body;
  const result = todoModel.deleteById(id);
  res.json({ result });
};

exports.clearCompleted = (_, res) => {
  const completed = todoModel.findAll({ completed: true });
  completed.forEach(todo => {
    todoModel.deleteById(todo.id);
  });
  res.json({ result: true });
};
