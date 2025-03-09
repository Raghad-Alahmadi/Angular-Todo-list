import { createAction, props } from '@ngrx/store';
import { Task } from './task.reducer';

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const deleteTask = createAction('[Task] Delete Task', props<{ id: number }>());
export const completeTask = createAction('[Task] Complete Task', props<{ id: number }>());
export const undoTask = createAction('[Task] Undo Task');