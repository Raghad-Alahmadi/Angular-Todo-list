import { Component } from '@angular/core';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-reactive-forms';
}