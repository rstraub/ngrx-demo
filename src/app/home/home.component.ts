import {Component, OnInit} from '@angular/core';
import {Todo} from '../models/todo';
import {TodoService} from '../todo.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {TodoDialogComponent} from '../todo-dialog/todo-dialog.component';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public todos: Todo[];
  public loading: boolean;

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

  openTodoDialog(): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(result => {
        this.todoService.addTodo(result);
        this.getTodos();
        this.snackBar.open(`Added ${result.description}`, 'Undo', {
          duration: 3000
        });
      });
  }
}
