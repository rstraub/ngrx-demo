import {TodoState} from './app.reducer';
import {UIState} from './ui/ui.reducer';

export interface AppState {
  todo: TodoState;
  ui: UIState;
}
