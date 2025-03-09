# Angular Todo List Application

This Angular Todo List Application allows you to manage your daily tasks efficiently. You can add, edit, and delete tasks, and mark them as complete. The app is built using Angular and leverages state management with NgRx to ensure a smooth and responsive user experience.
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.



## Debugging Process for `NullInjectorError: No provider for _Store!`

### Problem
The error `NullInjectorError: No provider for _Store!` indicates that the `Store` service is not being provided correctly in the application.

### Investigation
1. Reviewed the `app.module.ts` file to ensure that the `StoreModule` is correctly configured.
2. Checked the `todo-form.component.ts` file to ensure that the `Store` service is being injected correctly.
3. Noticed that the application is using standalone components, which require a different approach for providing the `Store` service.

### Explanation
The error occurs because the `StoreModule` is not correctly provided in the standalone component configuration. Standalone components should not use `StoreModule.forRoot` directly.

### Solution
The solution was to add the `Store` in the `app.config.ts` file using `provideStore`. This ensures that the `Store` is available throughout the application.

### Changes Made
1. Updated `app.config.ts` to provide the `StoreModule`:

    ```typescript
    import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
    import { provideRouter } from '@angular/router';
    import { provideStore } from '@ngrx/store';
    import { provideStoreDevtools } from '@ngrx/store-devtools';
    import { provideEffects } from '@ngrx/effects';
    import { taskReducer } from './store/task.reducer';
    import { routes } from './app.routes';
    import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

    export const appConfig: ApplicationConfig = {
      providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideClientHydration(withEventReplay()),
        provideStore({ tasks: taskReducer }),
        provideStoreDevtools({ maxAge: 25, logOnly: false }),
        provideEffects([])
      ]
    };
    ```

2. Updated `app.component.ts` to remove direct usage of `StoreModule.forRoot`:

    ```typescript
    import { Component } from '@angular/core';
    import { TodoFormComponent } from './components/todo-form/todo-form.component';
    import { CommonModule } from '@angular/common';
    import { ReactiveFormsModule } from '@angular/forms';

    @Component({
      selector: 'app-root',
      standalone: true,
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TodoFormComponent
      ],
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
    })
    export class AppComponent {
      title = 'angular-todolist';
    }
    ```

### Verification
Tested the application to ensure that the error is resolved and the `Store` service is correctly provided. The application now works as expected without any `NullInjectorError`.

---
