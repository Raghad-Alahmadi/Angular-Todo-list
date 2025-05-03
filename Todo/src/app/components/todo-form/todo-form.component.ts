import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
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
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup; // Form for adding tasks
  tasks$: Observable<Task[]>; // Observable to get tasks from the store
  documents: any[] = []; // Array to store fetched documents

  private documentApiUrl = 'https://verficationsystem.azurewebsites.net/api/document'; // API URL

  constructor(
    private fb: FormBuilder,
    private store: Store<TaskState>,
    private http: HttpClient // Inject HttpClient
  ) {
    this.todoForm = this.fb.group({
      taskName: ['', Validators.required]
    });
    this.tasks$ = this.store.select(selectAllTasks);
  }

  ngOnInit(): void {
    this.fetchDocuments(); // Fetch documents on component initialization
  }

  fetchDocuments(): void {
    this.http.get<any[]>(this.documentApiUrl).subscribe({
      next: (data) => {
        this.documents = data; // Assign fetched data to the documents array
      },
      error: (err) => {
        console.error('Error fetching documents:', err); // Handle errors
      }
    });
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