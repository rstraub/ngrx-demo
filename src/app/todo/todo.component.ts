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
  @Output() public todoUpdated = new EventEmitter<Todo>();
  @Output() public updateClicked = new EventEmitter<Todo>();

  constructor() {
  }

  ngOnInit() {
  }

  onCheckToggled(change) {
    const checked = change.checked;
    this.todoUpdated.emit({...this.todo, completed: checked});
  }

  onDeleteClicked(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this todo?');
    if (confirmed) {
      this.deleteClicked.emit(id);
    }
  }
}
