import { createReducer, on } from '@ngrx/store';
import { addTask, deleteTask, completeTask } from './task.actions';

export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: []
};

export const taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => ({ ...state, tasks: [...state.tasks, task] })),
  on(completeTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.map(task => task.id === id ? { ...task, completed: true } : task)
  })),
  on(deleteTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== id)
  }))
);