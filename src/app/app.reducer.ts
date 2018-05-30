import {createSelector} from '@ngrx/store';
import {AppActions, AppActionTypes} from './app.actions';
import {Todo} from './models/todo';

export interface AppState {
  ui: {
    loading: boolean;
    dialog: {
      todoDialogOpen: boolean
      todoDialog: object
    },
    snackBar: {
      isOpen: boolean
      message: string
    }
  };
  todos: Todo[];
}

const initialState: AppState = {
  ui: {
    loading: true,
    dialog: {
      todoDialogOpen: false,
      todoDialog: null
    },
    snackBar: {
      isOpen: false,
      message: null
    }
  },
  todos: null
};

export function appReducer(state: AppState = initialState, action: AppActions): AppState {
  switch (action.type) {
    case AppActionTypes.TODOS_LOADED:
      return {
        ...state,
        ui: {...state.ui, loading: false},
        todos: action.payload
      };
    case AppActionTypes.OPEN_TODO_DIALOG:
      return {
        ...state, ui: {
          ...state.ui, dialog: {
            todoDialogOpen: true, todoDialog: action.payload
          }
        }
      };
    case AppActionTypes.CLOSE_TODO_DIALOG:
      const todoDialog = action.payload ? {data: action.payload} : null;
      return {
        ...state, ui: {
          ...state.ui, dialog: {
            todoDialogOpen: false, todoDialog
          }
        }
      };
    case AppActionTypes.OPEN_SNACKBAR:
      return {
        ...state,
        ui: {
          ...state.ui,
          snackBar: {
            isOpen: true,
            message: action.payload
          }
        }
      };
    case AppActionTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        ui: {
          ...state.ui,
          snackBar: {
            isOpen: false,
            message: null
          }
        }
      };
    case AppActionTypes.GET_TODOS:
    case AppActionTypes.ADD_TODO:
    case AppActionTypes.DELETE_TODO:
    case AppActionTypes.UPDATE_TODO:
      return {
        ...state, ui: {
          ...state.ui, loading: true
        }
      };
    default:
      return state;
  }
}

const selectRoot = state => state.app;
export const selectUI = createSelector(
  selectRoot,
  state => state.ui
);
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
export const selectTodos = createSelector(
  selectRoot,
  state => state.todos
);
