import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'AI Native Studio | Vibe Coding, KI-Agenten, Fine-Tuning',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    data: { animation: 'home' }
  },
  {
    path: 'vibe-coding',
    title: 'Vibe Coding | AI Native Studio',
    loadComponent: () =>
      import('./features/vibe-coding/vibe-coding.component').then((m) => m.VibeCodingComponent),
    data: { animation: 'vibe-coding' }
  },
  {
    path: 'ki-agenten',
    title: 'KI-Agenten | AI Native Studio',
    loadComponent: () =>
      import('./features/ai-agents/ai-agents.component').then((m) => m.AiAgentsComponent),
    data: { animation: 'ki-agenten' }
  },
  {
    path: 'fine-tuning',
    title: 'Fine-Tuning | AI Native Studio',
    loadComponent: () =>
      import('./features/fine-tuning/fine-tuning.component').then((m) => m.FineTuningComponent),
    data: { animation: 'fine-tuning' }
  },
  {
    path: 'kontakt',
    title: 'Kontakt | AI Native Studio',
    loadComponent: () => import('./features/contact/contact.component').then((m) => m.ContactComponent),
    data: { animation: 'kontakt' }
  },
  {
    path: 'login',
    title: 'Login | AI Native Studio',
    loadComponent: () => import('./features/login/login.component').then((m) => m.LoginComponent),
    data: { animation: 'login' }
  },
  {
    path: 'ki-workspace',
    title: 'KI Workspace | AI Native Studio',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/ai-workspace/ai-workspace.component').then((m) => m.AiWorkspaceComponent),
    data: { animation: 'ki-workspace' }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
