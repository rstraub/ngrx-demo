import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from '../models/todo';
import {MAT_CHECKBOX_CLICK_ACTION} from '@angular/material';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}
  ]
})
export class TodoComponent implements OnInit {
  @Input() public todo: Todo;
  @Output() public deleteClicked = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  toggleCompleted() {
    this.todo.completed = !this.todo.completed;
  }
}
