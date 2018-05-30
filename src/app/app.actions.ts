import { Action } from '@ngrx/store';
import {Todo} from './models/todo';

export enum AppActionTypes {
  TODOS_LOADED = '[DATA] Loaded Todos',
  GET_TODOS = '[DATA] Get Todos',
  DELETE_TODO = '[DATA] Delete Todos',
  UPDATE_TODO = '[DATA] Update Todo',
  ADD_TODO = '[DATA] Add Todo'
}

export class TodosLoaded implements Action {
  readonly type = AppActionTypes.TODOS_LOADED;
  constructor(public payload: Todo[]) {}
}

export class AddTodo implements Action {
  readonly type = AppActionTypes.ADD_TODO;
  constructor(public payload: Todo) {}
}

export class DeleteTodo implements Action {
  readonly type = AppActionTypes.DELETE_TODO;
  constructor(public payload: number) {}
}

export class UpdateTodo implements Action {
  readonly type = AppActionTypes.UPDATE_TODO;
  constructor(public payload: Todo) {}
}

export class GetTodos implements Action {
  readonly type = AppActionTypes.GET_TODOS;
}

export type AppActions =
  TodosLoaded
  | GetTodos
  | DeleteTodo
  | AddTodo
  | UpdateTodo;
