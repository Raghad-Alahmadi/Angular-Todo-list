import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { addTask, deleteTask, completeTask } from './task.actions';
import { TaskState } from './task.reducer';
import { selectTaskState } from './task.selectors';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private store: Store<TaskState>) {
    this.actions$.pipe(
      ofType(addTask, deleteTask, completeTask)
    ).subscribe(() => {
      this.store.select(selectTaskState).subscribe(tasksState => {
        localStorage.setItem('tasks', JSON.stringify(tasksState.tasks));
      });
    });
  }
}