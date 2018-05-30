import {Component, OnInit} from '@angular/core';
import {Todo} from '../models/todo';
import {MatDialog, MatSnackBar} from '@angular/material';
import {TodoDialogComponent} from '../todo-dialog/todo-dialog.component';
import {select, Store} from '@ngrx/store';
import {selectTodos} from '../app.reducer';
import {Observable} from 'rxjs/Observable';
import {AddTodo, DeleteTodo, GetTodos, UpdateTodo} from '../app.actions';
import {selectDialog, selectLoading, selectSnackBar} from '../ui/ui.reducer';
import {AppState} from '../app-state.model';
import {CloseSnackBar, OpenedTodoDialog, OpenSnackBar} from '../ui/ui.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public todos$: Observable<Todo[]>;
  public loading$: Observable<boolean>;
  private readonly SNACKBAR_DURATION = 3000;
  private readonly DIALOG_SIZE = '500px';

  constructor(private store: Store<AppState>, private snackBar: MatSnackBar, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loading$ = this.store.pipe(select(selectLoading));
    this.getTodos();
    this.handleDialog();
    this.handleSnackbar();
  }

  private getTodos() {
    this.todos$ = this.store.pipe(select(selectTodos));
    this.store.dispatch(new GetTodos());
  }

  public onDeleteClicked(id: number) {
    this.store.dispatch(new DeleteTodo(id));
    this.store.dispatch(new OpenSnackBar(`Deleted todo`));
  }

  public onTodoUpdated(todo: Todo) {
    this.store.dispatch(new UpdateTodo(todo));
  }

  public openTodoDialog(): void {
    this.store.dispatch(new OpenedTodoDialog({
      width: this.DIALOG_SIZE,
      data: {isUpdate: false, todo: {}}
    }));
  }

  public updateTodoDialog(todo: Todo) {
    this.store.dispatch(new OpenedTodoDialog({
      width: this.DIALOG_SIZE,
      data: {isUpdate: true, todo: {...todo}}
    }));
  }

  private handleDialog() {
    let dialogRef;

    this.store.pipe(
      select(selectDialog)
    ).subscribe(dialog => {
      if (dialog.todoDialogOpen) {
        dialogRef = this.dialog.open(TodoDialogComponent, dialog.todoDialog);
      } else if (dialogRef) {
        dialogRef.close();
        if (dialog.todoDialog) {
          this.handleTodoEdit(dialog.todoDialog.data);
        }
      }
    });
  }

  private handleTodoEdit(dialogResult) {
    const todo = dialogResult.todo;
    let message;
    if (dialogResult.isUpdate) {
      message = 'Updated';
      this.store.dispatch(new UpdateTodo(todo));
    } else {
      message = 'Added';
      this.store.dispatch(new AddTodo(todo));
    }
    this.store.dispatch(new OpenSnackBar(`${message} ${todo.description}`));
  }

  private handleSnackbar() {
    this.store
      .pipe(select(selectSnackBar))
      .subscribe(snackBar => {
        if (snackBar.isOpen) {
          this.snackBar.open(snackBar.message);
          setTimeout(() => this.store.dispatch(new CloseSnackBar()), this.SNACKBAR_DURATION);
        } else {
          this.snackBar.dismiss();
        }
      });
  }
}
