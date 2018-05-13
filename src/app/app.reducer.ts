import {createSelector} from '@ngrx/store';
import {AppActionTypes} from './app.actions';
import {Todo} from './models/todo';

export interface AppState {
  ui: {
    loading: boolean;
    dialog: {
      todoDialogOpen: boolean
      todoDialog: object
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
    }
  },
  todos: null
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case AppActionTypes.TODOS_LOADED:
      return {
        ...state,
        ui: {...state.ui, loading: false},
        todos: action.payload
      };
    case AppActionTypes.OPENED_TODO_DIALOG:
      return {
        ...state, ui: {
          ...state.ui, dialog: {
            todoDialogOpen: true, todoDialog: action.payload
          }
        }
      };
    case AppActionTypes.CLOSED_TODO_DIALOG:
      const todoDialog = action.payload ? {data: action.payload} : null;
      return {
        ...state, ui: {
          ...state.ui, dialog: {
            todoDialogOpen: false, todoDialog
          }
        }
      };
    case AppActionTypes.GET_TODOS:
    case AppActionTypes.ADD_TODO:
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

export const selectUI = state => state.app.ui;
export const selectLoading = createSelector(
  selectUI,
  state => state.loading
);
export const selectDialog = createSelector(
  selectUI,
  state => state.dialog
);
export const selectTodos = state => state.app.todos;
