import { Action } from '@ngrx/store';

export enum AppActionTypes {
  TODOS_LOADED = '[App] Loaded Todos',
  LOADING_TODOS = '[App] Loading Todos'
}

export class TodosLoaded implements Action {
  type: string = AppActionTypes.TODOS_LOADED;
}

export class LoadingTodos implements Action {
  type: string = AppActionTypes.LOADING_TODOS;
}

export type AppActions =
  | TodosLoaded
  | LoadingTodos;
