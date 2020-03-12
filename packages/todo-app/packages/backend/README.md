# TODO App Backend

## Business

### User stories

- Người dùng có thể tạo nhiều todo item
- Người dùng có thể mark done 1 hoặc nhiều todo item
- Người dùng có thể xem toàn bộ todo (Bao gồm đã hoàn thành và chưa hoàn thành)
- Người dùng có thể filter những todo đã hoàn thành
- Người dùng có thể filter những todo chưa hoàn thành
- Người dùng có thể xóa các todo
- Người dùng có thể xóa toàn bộ những todo đã hoàn thành
- Nguoi dung có thê sưa nôi dung todo.

## Analyse

### Build APIs

- Create Todo (Create single todo for each time) (`/api/createTodo`)
- Update Todo & Mark this todo as completed (`/api/updateTodo`)
- Get All Todo (`/api/todos`)
- Get All completed todos (`/api/todos` with params: `completed: boolean`)
- Get All activated todos (`/api/todos` with params: `completed: false`)
- Delete Todo (`/api/deleteTodo`)
- Clear Completed todos (`/api/clearCompleted`)

> All api are accept JSON body, response JSON.
