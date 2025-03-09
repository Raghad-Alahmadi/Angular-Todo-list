import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class TodoFormComponent {
  todoForm: FormGroup;
  tasks: { task: string, completed: boolean }[] = [];

  constructor(private fb: FormBuilder) {
    // Form creation using FormBuilder
    this.todoForm = this.fb.group({
      // Validation: task is required
      task: ['', Validators.required] 
    });
  }

  addTask() {
    if (this.todoForm.valid) {
      // Add task to the list
      this.tasks.push({ task: this.todoForm.value.task, completed: false });
      // Reset the form after submission
      this.todoForm.reset();
    }
  }

}