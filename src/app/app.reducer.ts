import { createSelector } from '@ngrx/store';
import { AppActionTypes } from './app.actions';

export interface AppState {
  ui: {
    loading: boolean;
    dialog: {
      todoDialogOpen: boolean
      todoDialog: object
    }
  };
}

const initialState: AppState = {
  ui: {
    loading: true,
    dialog: {
      todoDialogOpen: false,
      todoDialog: null
    }
  }
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case AppActionTypes.TODOS_LOADED:
      return {...state, ui: { ...state.ui, loading: false }};
    case AppActionTypes.LOADING_TODOS:
      return {...state, ui: { ...state.ui, loading: true }};
    case AppActionTypes.OPENED_TODO_DIALOG:
      return {...state, ui: { ...state.ui, dialog: {
          todoDialogOpen: true, todoDialog: action.payload }
        }
      };
    case AppActionTypes.CLOSED_TODO_DIALOG:
      return {...state, ui: { ...state.ui, dialog: {
        todoDialogOpen: false, todoDialog: null
      }}
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
