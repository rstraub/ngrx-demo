import { Action } from '@ngrx/store';
import {Todo} from './models/todo';

export enum AppActionTypes {
  OPEN_TODO_DIALOG = '[UI] Open Todo Dialog',
  CLOSE_TODO_DIALOG = '[UI] Close Todo Dialog',
  OPEN_SNACKBAR = '[UI] Open Snackbar',
  CLOSE_SNACKBAR = '[UI] Close Snackbar',
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

export class OpenedTodoDialog implements Action {
  readonly type = AppActionTypes.OPEN_TODO_DIALOG;
  constructor(public payload: any) {}
}

export class ClosedTodoDialog implements Action {
  readonly type = AppActionTypes.CLOSE_TODO_DIALOG;
  constructor(public payload?: any) {}
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

export class OpenSnackBar implements Action {
  readonly type = AppActionTypes.OPEN_SNACKBAR;
  constructor(public payload: string) {}
}

export class CloseSnackBar implements Action {
  readonly type = AppActionTypes.CLOSE_SNACKBAR;
}

export type AppActions =
  TodosLoaded
  | OpenedTodoDialog
  | ClosedTodoDialog
  | CloseSnackBar
  | OpenSnackBar
  | GetTodos
  | DeleteTodo
  | AddTodo
  | UpdateTodo;
