import { createReducer, on } from '@ngrx/store';
import { addTask, deleteTask, completeTask, undoTask } from './task.actions';

export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export interface TaskState {
  tasks: Task[];
  lastAction: { type: string, task?: Task, id?: number } | null;
}

export const initialState: TaskState = {
  tasks: [],
  lastAction: null
};

export const taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
    lastAction: { type: '[Task] Add Task', task }
  })),
  on(completeTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.map(task => task.id === id ? { ...task, completed: true } : task),
    lastAction: { type: '[Task] Complete Task', id }
  })),
  on(deleteTask, (state, { id }) => {
    const taskToDelete = state.tasks.find(task => task.id === id);
    return {
      ...state,
      tasks: state.tasks.filter(task => task.id !== id),
      lastAction: { type: '[Task] Delete Task', task: taskToDelete }
    };
  }),
  on(undoTask, (state) => {
    if (!state.lastAction) return state;

    switch (state.lastAction.type) {
      case '[Task] Add Task':
        return {
          ...state,
          tasks: state.tasks.filter(task => task.id !== state.lastAction!.task!.id),
          lastAction: null
        };
      case '[Task] Complete Task':
        return {
          ...state,
          tasks: state.tasks.map(task => task.id === state.lastAction!.id ? { ...task, completed: false } : task),
          lastAction: null
        };
      case '[Task] Delete Task':
        return {
          ...state,
          tasks: [...state.tasks, state.lastAction!.task!],
          lastAction: null
        };
      default:
        return state;
    }
  })
);