import {TodoPriority} from './todo-priority';

export interface Todo {
  completed: boolean;
  description: string;
  priority: TodoPriority;
  note: string;
}
