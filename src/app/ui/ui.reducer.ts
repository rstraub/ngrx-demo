import {AppActions, AppActionTypes} from '../app.actions';
import {UIActions, UIActionTypes} from './ui.actions';
import {createSelector} from '@ngrx/store';

export interface UIState {
  loading: boolean;
  dialog: {
    todoDialogOpen: boolean
    todoDialog: object
  };
  snackBar: {
    isOpen: boolean
    message: string
  };
}

const initialState = {
  loading: true,
  dialog: {
    todoDialogOpen: false,
    todoDialog: null
  },
  snackBar: {
    isOpen: false,
    message: null
  }
};

export function uiReducer(state: UIState = initialState, action: UIActions | AppActions): UIState {
  switch (action.type) {
    case AppActionTypes.TODOS_LOADED:
      return {
        ...state,
        loading: false
      };
    case UIActionTypes.OPEN_TODO_DIALOG:
      return {
        ...state,
        dialog: {
          todoDialogOpen: true,
          todoDialog: action.payload
        }
      };
    case UIActionTypes.CLOSE_TODO_DIALOG:
      const todoDialog = action.payload ? {data: action.payload} : null;
      return {
        ...state,
        dialog: {
          todoDialogOpen: false,
          todoDialog
        }
      };
    case UIActionTypes.OPEN_SNACKBAR:
      return {
        ...state,
        snackBar: {
          isOpen: true,
          message: action.payload
        }
      };
    case UIActionTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        snackBar: {
          isOpen: false,
          message: null
        }
      };
    case AppActionTypes.GET_TODOS:
    case AppActionTypes.ADD_TODO:
    case AppActionTypes.DELETE_TODO:
    case AppActionTypes.UPDATE_TODO:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

const selectUI = state => state.ui;
export const selectLoading = createSelector(
  selectUI,
  state => state.loading
);
export const selectDialog = createSelector(
  selectUI,
  state => state.dialog
);
export const selectSnackBar = createSelector(
  selectUI,
  state => state.snackBar
);

