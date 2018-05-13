import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Todo} from '../models/todo';
import {TodoPriority} from '../models/todo-priority';
import {AppState} from '../app.reducer';
import {Store} from '@ngrx/store';
import {ClosedTodoDialog} from '../app.actions';

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

  constructor(private store: Store<AppState>,
              public dialogRef: MatDialogRef<TodoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { isUpdate: boolean, todo: Todo }) {
  }

  onNoClick(): void {
    this.store.dispatch(new ClosedTodoDialog());
  }

  submit() {
    this.store.dispatch(new ClosedTodoDialog(this.data));
  }
}
