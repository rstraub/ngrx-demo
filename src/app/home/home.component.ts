import {Component, OnInit} from '@angular/core';
import {Todo} from '../models/todo';
import {TodoService} from '../todo.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {TodoDialogComponent} from '../todo-dialog/todo-dialog.component';
import {select, Store} from '@ngrx/store';
import {AppState, selectDialog, selectLoading} from '../app.reducer';
import {Observable} from 'rxjs/Observable';
import {LoadingTodos, OpenedTodoDialog, TodosLoaded} from '../app.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public todos: Todo[];
  public loading$: Observable<boolean>;
  private readonly SNACKBAR_DURATION = 3000;
  private readonly DIALOG_SIZE = '500px';

  constructor(private store: Store<AppState>, private snackBar: MatSnackBar, private dialog: MatDialog, private todoService: TodoService) {
  }

  ngOnInit() {
    this.loading$ = this.store.pipe(select(selectLoading));
    this.getTodos();
    this.handleDialog();
  }

  private getTodos() {
    this.store.dispatch(new LoadingTodos());
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
      this.store.dispatch(new TodosLoaded());
    });
  }

  public onDeleteClicked(id: number) {
    this.todoService.deleteTodo(id);
    this.snackBar.open(`Deleted todo`, null, {
      duration: this.SNACKBAR_DURATION
    });
    this.getTodos();
  }

  public onTodoUpdated(todo: Todo) {
    this.todoService.updateTodo(todo);

    this.snackBar.open(`Updated ${todo.description}`, null, {
      duration: this.SNACKBAR_DURATION
    });
    this.getTodos();
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
      this.todoService.updateTodo(todo)
        .subscribe(() => this.getTodos());
    } else {
      message = 'Added';
      this.todoService.addTodo(todo)
        .subscribe(() => this.getTodos());
    }
    this.snackBar.open(`${message} ${todo.description}`, null, {
      duration: this.SNACKBAR_DURATION
    });
  }
}
