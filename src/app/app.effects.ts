import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {TodoService} from './todo.service';
import {Observable} from 'rxjs/Observable';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Action} from '@ngrx/store';
import {AppActionTypes, TodosLoaded} from './app.actions';


@Injectable()
export class AppEffects {
  constructor(private todoService: TodoService, private actions$: Actions) {}

  @Effect()
  getTodos$: Observable<Action> = this.actions$.pipe(
    ofType(AppActionTypes.GET_TODOS),
    mergeMap(() =>
      this.todoService.getTodos().pipe(
        // If successful, dispatch success action with result
        map(todos => new TodosLoaded(todos)),
        // If request fails, dispatch failed action
        catchError(() => console.error('handle the error here'))
      )
    )
  );

  @Effect()
  addTodo$: Observable<Action> = this.actions$.pipe(
    ofType(AppActionTypes.ADD_TODO),
    mergeMap(action =>
      this.todoService.addTodo(action.payload).pipe(
        // If successful, dispatch success action with result
        map(todos => new TodosLoaded(todos)),
        // If request fails, dispatch failed action
        catchError(() => console.error('handle the error here'))
      )
    )
  );

  @Effect()
  updateTodo$: Observable<Action> = this.actions$.pipe(
    ofType(AppActionTypes.UPDATE_TODO),
    mergeMap(action =>
      this.todoService.updateTodo(action.payload).pipe(
        // If successful, dispatch success action with result
        map(todos => new TodosLoaded(todos)),
        // If request fails, dispatch failed action
        catchError(() => console.error('handle the error here'))
      )
    )
  );
}
