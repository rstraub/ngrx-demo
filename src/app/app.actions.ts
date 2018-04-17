import { Action } from '@ngrx/store';

export enum AppActionTypes {
  TODOS_LOADED = '[DATA] Loaded Todos',
  LOADING_TODOS = '[DATA] Loading Todos',
  OPENED_TODO_DIALOG = '[UI] Opened Todo Dialog',
  CLOSED_TODO_DIALOG = '[UI] Closed Todo Dialog',
}

export class TodosLoaded implements Action {
  type: string = AppActionTypes.TODOS_LOADED;
}

export class LoadingTodos implements Action {
  type: string = AppActionTypes.LOADING_TODOS;
}

export class OpenedTodoDialog implements Action {
  type: string = AppActionTypes.OPENED_TODO_DIALOG;
  constructor(public payload: any) {}
}

export class ClosedTodoDialog implements Action {
  type: string = AppActionTypes.OPENED_TODO_DIALOG;
}

export type AppActions =
  | TodosLoaded
  | OpenedTodoDialog
  | ClosedTodoDialog
  | LoadingTodos;
