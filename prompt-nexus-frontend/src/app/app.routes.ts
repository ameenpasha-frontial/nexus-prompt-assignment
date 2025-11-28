// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login-auth/login.component';
import { PromptLibraryComponent } from './prompt-library/prompt-library.component';
import { AddPromptComponent } from './prompt-library/add-prompt.component';
import { PromptDetailComponent } from './prompt-library/prompt-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // root redirects to dashboard
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: PromptLibraryComponent }, // dashboard/home page
  { path: 'prompts', component: PromptLibraryComponent },
  { path: 'add', component: AddPromptComponent },
  { path: 'prompts/:id', component: PromptDetailComponent },
  { path: '**', redirectTo: 'dashboard' }, // fallback to dashboard
];