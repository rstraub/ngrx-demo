import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Todo} from './models/todo';
import {of} from 'rxjs/observable/of';

@Injectable()
export class TodoService {

  constructor() {
  }

  public getTodos(): Observable<Todo[]> {
    return of([{
      completed: false,
      note: 'nothing to see here',
      description: 'get smart',
      priority: 1
    }, {
      completed: true,
      note: 'it\'s something!',
      description: 'do cool stuff',
      priority: 2
    }]);
  }
}
