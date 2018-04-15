import {TodoPriority} from './todo-priority';

export interface Todo {
  id: number;
  completed: boolean;
  description: string;
  priority: TodoPriority;
  note: string;
}
