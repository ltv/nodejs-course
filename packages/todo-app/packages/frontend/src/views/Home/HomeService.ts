import Service from '@/service';
import { Todo } from '@/store';

export class HomeService extends Service {
  public getTodoList(completed?: boolean): Promise<Todo[]> {
    // return [{ id: 1, title: 'My First Todo', completed: false }];
    let params = {};
    if (completed !== undefined && completed !== null) {
      params = { completed: !!completed }; // completed = '' -> false, completed = 0 -> false, completed = 1 "abc"
    }
    return this.post('/todos', params);
  }

  public createTodo(todo: Todo): Promise<Todo> {
    return this.post('/createTodo', todo);
  }

  public updateTodo(todo: Todo): Promise<Todo> {
    return this.post('/updateTodo', todo);
  }

  public deleteTodo(id: number): Promise<boolean> {
    return this.post('/deleteTodo', { id });
  }
}
