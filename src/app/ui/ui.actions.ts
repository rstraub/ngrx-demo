import {Action} from '@ngrx/store';

export enum UIActionTypes {
  OPEN_TODO_DIALOG = '[UI] Open Todo Dialog',
  CLOSE_TODO_DIALOG = '[UI] Close Todo Dialog',
  OPEN_SNACKBAR = '[UI] Open Snackbar',
  CLOSE_SNACKBAR = '[UI] Close Snackbar',
}

export class OpenedTodoDialog implements Action {
  readonly type = UIActionTypes.OPEN_TODO_DIALOG;

  constructor(public payload: any) {
  }
}

export class ClosedTodoDialog implements Action {
  readonly type = UIActionTypes.CLOSE_TODO_DIALOG;

  constructor(public payload?: any) {
  }
}

export class OpenSnackBar implements Action {
  readonly type = UIActionTypes.OPEN_SNACKBAR;

  constructor(public payload: string) {
  }
}

export class CloseSnackBar implements Action {
  readonly type = UIActionTypes.CLOSE_SNACKBAR;
}

export type UIActions =
  CloseSnackBar |
  OpenSnackBar |
  OpenedTodoDialog |
  ClosedTodoDialog;
