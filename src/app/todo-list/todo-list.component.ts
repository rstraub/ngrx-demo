import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  public completed: Todo[];
  public open: Todo[];

  @Input() public set todos(todos: Todo[]) {
    this.completed = todos.filter(todo => todo.completed);
    this.open = todos.filter(todo => !todo.completed);
  }

  constructor() { }

  ngOnInit() {
  }
}
