import {Component, OnInit} from '@angular/core';
import {Todo} from '../models/todo';
import {TodoService} from '../todo.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {TodoDialogComponent} from '../todo-dialog/todo-dialog.component';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public todos: Todo[];
  public loading: boolean;
  private readonly SNACKBAR_DURATION = 3000;
  private readonly DIALOG_SIZE = '500px';

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog, private todoService: TodoService) {
  }

  ngOnInit() {
    this.getTodos();
  }

  private getTodos() {
    this.loading = true;
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
      this.loading = false;
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
    this.handleDialog({
      width: this.DIALOG_SIZE,
      data: {isUpdate: false, todo: {}}
    }, 'Added', false);
  }

  public updateTodoDialog(todo: Todo) {
    this.handleDialog({
      width: this.DIALOG_SIZE,
      data: {isUpdate: true, todo: {...todo}}
    }, 'Updated', true);
  }

  private handleDialog(config, message, isUpdate) {
    const dialogRef = this.dialog.open(TodoDialogComponent, config);

    dialogRef.afterClosed()
      .pipe(
        filter(result => result && result.todo),
        map(result => result.todo)
      )
      .subscribe(todo => {
        if (isUpdate) {
          this.todoService.updateTodo(todo)
            .subscribe(() => this.getTodos());
        } else {
          this.todoService.addTodo(todo)
            .subscribe(() => this.getTodos());
        }
        this.snackBar.open(`${message} ${todo.description}`, null, {
          duration: this.SNACKBAR_DURATION
        });
      });
  }
}
