import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {TodoService} from './todo.service';
import {Observable} from 'rxjs/Observable';
import {map, mergeMap} from 'rxjs/operators';
import {Action} from '@ngrx/store';
import {AddTodo, AppActionTypes, DeleteTodo, GetTodos, TodosLoaded, UpdateTodo} from './app.actions';


@Injectable()
export class AppEffects {
  constructor(private todoService: TodoService, private actions$: Actions) {}

  @Effect()
  getTodos$: Observable<Action> = this.actions$.pipe(
    ofType<GetTodos>(AppActionTypes.GET_TODOS),
    mergeMap(() =>
      this.todoService.getTodos().pipe(
        // If successful, dispatch success action with result
        map(todos => new TodosLoaded(todos)),
        // If request fails, dispatch failed action
        // catchError(() => console.error('handle the error here'))
      )
    )
  );

  @Effect()
  deleteTodo$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteTodo>(AppActionTypes.DELETE_TODO),
    mergeMap(action =>
      this.todoService.deleteTodo(action.payload).pipe(
        map(todos => new TodosLoaded(todos)),
      )
    )
  );

  @Effect()
  addTodo$: Observable<Action> = this.actions$.pipe(
    ofType<AddTodo>(AppActionTypes.ADD_TODO),
    mergeMap(action =>
      this.todoService.addTodo(action.payload).pipe(
        map(todos => new TodosLoaded(todos)),
      )
    )
  );

  @Effect()
  updateTodo$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateTodo>(AppActionTypes.UPDATE_TODO),
    mergeMap(action =>
      this.todoService.updateTodo(action.payload).pipe(
        map(todos => new TodosLoaded(todos)),
      )
    )
  );
}
