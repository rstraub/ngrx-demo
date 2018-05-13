import { Action } from '@ngrx/store';
import {Todo} from './models/todo';

export enum AppActionTypes {
  OPENED_TODO_DIALOG = '[UI] Opened Todo Dialog',
  CLOSED_TODO_DIALOG = '[UI] Closed Todo Dialog',
  TODOS_LOADED = '[DATA] Loaded Todos',
  GET_TODOS = '[DATA] Get Todos',
  UPDATE_TODO = '[DATA] Update Todo',
  ADD_TODO = '[DATA] Add Todo'
}

export class TodosLoaded implements Action {
  type: string = AppActionTypes.TODOS_LOADED;
  constructor(public payload: Todo[]) {}
}

export class OpenedTodoDialog implements Action {
  type: string = AppActionTypes.OPENED_TODO_DIALOG;
  constructor(public payload: any) {}
}

export class ClosedTodoDialog implements Action {
  type: string = AppActionTypes.CLOSED_TODO_DIALOG;
  constructor(public payload?: any) {}
}

export class AddTodo implements Action {
  type: string = AppActionTypes.ADD_TODO;
  constructor(public payload: Todo) {}
}

export class UpdateTodo implements Action {
  type: string = AppActionTypes.UPDATE_TODO;
  constructor(public payload: Todo) {}
}

export class GetTodos implements Action {
  type: string = AppActionTypes.GET_TODOS;
}

export type AppActions =
  | TodosLoaded
  | OpenedTodoDialog
  | ClosedTodoDialog
  | GetTodos
  | AddTodo
  | UpdateTodo;
