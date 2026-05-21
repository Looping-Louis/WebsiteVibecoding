import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { ContactRequest } from '../../core/models';
import { ContactService } from '../../core/services/contact.service';
import { ContentService } from '../../core/services/content.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { GlowCardComponent } from '../../shared/components/glow-card/glow-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    ButtonComponent,
    GlowCardComponent,
    SectionHeaderComponent,
    ScrollRevealDirective
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly contentService = inject(ContentService);
  private readonly contactService = inject(ContactService);

  readonly topics$ = this.contentService.getContactTopics();
  readonly submitState = signal<'idle' | 'submitting' | 'success' | 'error'>('idle');
  readonly error = signal('');

  readonly form = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    topic: ['AI-native Produktberatung', [Validators.required]],
    message: ['', [Validators.required]]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitState.set('submitting');
    this.error.set('');
    const request: ContactRequest = this.form.getRawValue();

    this.contactService
      .submitContact(request)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.submitState.set('success');
          this.form.reset({
            name: '',
            email: '',
            topic: request.topic,
            message: ''
          });
        },
        error: () => {
          this.submitState.set('error');
          this.error.set('Die Anfrage konnte gerade nicht gesendet werden. Bitte versuche es erneut.');
        }
      });
  }

  fieldInvalid(field: 'name' | 'email' | 'message'): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.dirty || control.touched);
  }
}
