import { createSelector } from '@ngrx/store';

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
    default:
      return state;
  }
}

export const selectUI = state => state.app.ui;
export const selectLoading = createSelector(
  selectUI,
  state => state.loading
);
