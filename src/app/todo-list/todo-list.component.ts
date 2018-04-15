import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  public completed: Todo[];
  public open: Todo[];

  @Input()
  public set todos(todos: Todo[]) {
    this.completed = todos.filter(todo => todo.completed);
    this.open = todos.filter(todo => !todo.completed);
  }

  @Output() public deleteClicked = new EventEmitter<number>();
  @Output() public todoUpdated = new EventEmitter<Todo>();
}
