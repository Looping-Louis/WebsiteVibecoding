import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AiMessage } from '../../core/models';
import { AiWorkspaceService } from '../../core/services/ai-workspace.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-ai-workspace',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './ai-workspace.component.html',
  styleUrl: './ai-workspace.component.scss'
})
export class AiWorkspaceComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly aiWorkspaceService = inject(AiWorkspaceService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly session$ = this.authService.session$;
  readonly loading = signal(false);
  readonly messages = signal<AiMessage[]>([]);

  readonly form = this.formBuilder.group({
    prompt: ['', [Validators.required, Validators.minLength(4)]]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const prompt = this.form.controls.prompt.value.trim();
    const userMessage: AiMessage = {
      role: 'user',
      content: prompt,
      createdAt: new Date().toISOString()
    };

    this.messages.update((messages) => [...messages, userMessage]);
    this.loading.set(true);
    this.form.reset({ prompt: '' });

    this.aiWorkspaceService
      .generate({ prompt })
      .pipe(take(1))
      .subscribe((message) => {
        this.messages.update((messages) => [...messages, message]);
        this.loading.set(false);
      });
  }

  logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }
}
