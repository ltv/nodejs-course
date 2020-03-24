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
  const os = require('os');
  const ifaces = os.networkInterfaces();

  Object.keys(ifaces).forEach(function(ifname) {
    let alias = 0;

    ifaces[ifname].forEach(function(iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(ifname + ':' + alias, iface.address);
      } else {
        // this interface has only one ipv4 adress
        console.log(ifname, iface.address);
      }
      ++alias;
    });
  });
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
