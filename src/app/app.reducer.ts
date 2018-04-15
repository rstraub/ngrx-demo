import { createSelector } from '@ngrx/store';
import { AppActionTypes } from './app.actions';

export interface AppState {
  ui: {
    loading: boolean;
  };
}

const initialState: AppState = {
  ui: {
    loading: true
  }
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case AppActionTypes.TODOS_LOADED:
      return {...state, ui: { loading: false }};
    case AppActionTypes.LOADING_TODOS:
      return {...state, ui: { loading: true }};
    default:
      return state;
  }
}

export const selectUI = state => state.app.ui;
export const selectLoading = createSelector(
  selectUI,
  state => state.loading
);
