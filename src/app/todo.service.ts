import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Todo} from './models/todo';
import {of} from 'rxjs/observable/of';
import {TodoPriority} from './models/todo-priority';

@Injectable()
export class TodoService {

  constructor() {
  }

  private todos = [{
    completed: false,
    note: 'Sparkly...',
    description: 'Clean the kitchen',
    priority: TodoPriority.HIGH
  }, {
    completed: false,
    note: 'Food',
    description: 'Get groceries',
    priority: TodoPriority.MEDIUM
  }, {
    completed: true,
    note: 'Really...',
    description: 'Take out the trash',
    priority: TodoPriority.LOW
  }];

  public getTodos(): Observable<Todo[]> {
    return of(this.todos);
  }

  public addTodo(todo: Todo) {
    this.todos.push(todo);
  }
}
