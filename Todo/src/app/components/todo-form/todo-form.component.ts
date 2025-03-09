
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addTask, deleteTask, completeTask } from '../../store/task.actions';
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
    // Initialize the form
    this.todoForm = this.fb.group({
      // Form control with validation
      taskName: ['', Validators.required] 
    });

    // Get tasks from the store
    this.tasks$ = this.store.select(selectAllTasks);
  }

  // Add a new task
  onSubmit() {
    if (this.todoForm.valid) {
      const newTask: Task = {
        id: Date.now(), // Unique ID for the task
        name: this.todoForm.value.taskName,
        completed: false
      };
      this.store.dispatch(addTask({ task: newTask })); 
      this.todoForm.reset(); // Reset the form after submission
    }
  }

  // Mark a task as completed
  onComplete(id: number) {
    this.store.dispatch(completeTask({ id })); // complete task
  }

  // Delete a task
  onDelete(id: number) {
    this.store.dispatch(deleteTask({ id })); // delete task
  }
}
