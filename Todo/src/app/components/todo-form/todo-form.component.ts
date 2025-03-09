import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addTask, deleteTask, completeTask, undoTask } from '../../store/task.actions';
import { TaskState, Task } from '../../store/task.reducer';
import { selectAllTasks } from '../../store/task.selectors';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class TodoFormComponent {
  todoForm: FormGroup; // Form for adding tasks
  tasks$: Observable<Task[]>; // Observable to get tasks from the store

  constructor(private fb: FormBuilder, private store: Store<TaskState>) {
    this.todoForm = this.fb.group({
      taskName: ['', Validators.required]
    });
    this.tasks$ = this.store.select(selectAllTasks);
  }

  onSubmit() {
    const task: Task = {
      id: Date.now(),
      name: this.todoForm.value.taskName,
      completed: false
    };
    this.store.dispatch(addTask({ task }));
    this.todoForm.reset();
  }

  onComplete(id: number) {
    this.store.dispatch(completeTask({ id }));
  }

  onDelete(id: number) {
    this.store.dispatch(deleteTask({ id }));
  }

  onUndo() {
    this.store.dispatch(undoTask());
  }
}