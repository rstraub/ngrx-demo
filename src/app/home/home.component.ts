import {Component, OnInit} from '@angular/core';
import {Todo} from '../models/todo';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public todos: Todo[];

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

}
