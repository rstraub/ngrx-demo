import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Todo} from '../models/todo';
import {TodoPriority} from '../models/todo-priority';
import {TodoState} from '../app.reducer';
import {Store} from '@ngrx/store';
import {ClosedTodoDialog} from '../ui/ui.actions';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.css']
})
export class TodoDialogComponent {
  public priorities = [
    {value: TodoPriority.HIGH, viewValue: 'High'},
    {value: TodoPriority.MEDIUM, viewValue: 'Medium'},
    {value: TodoPriority.LOW, viewValue: 'Low'}
  ];

  constructor(private store: Store<TodoState>,
              @Inject(MAT_DIALOG_DATA) public data: { isUpdate: boolean, todo: Todo }) {
  }

  onNoClick(): void {
    this.store.dispatch(new ClosedTodoDialog());
  }

  submit() {
    this.store.dispatch(new ClosedTodoDialog(this.data));
  }
}
