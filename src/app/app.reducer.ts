import {createSelector} from '@ngrx/store';
import {AppActions, AppActionTypes} from './app.actions';
import {Todo} from './models/todo';

export interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: null
};

export function appReducer(state: TodoState = initialState, action: AppActions): TodoState {
  switch (action.type) {
    case AppActionTypes.TODOS_LOADED:
      return {
        ...state,
        todos: action.payload
      };
    default:
      return state;
  }
}

const selectRoot = state => state.todo;
export const selectTodos = createSelector(
  selectRoot,
  state => state.todos
);
