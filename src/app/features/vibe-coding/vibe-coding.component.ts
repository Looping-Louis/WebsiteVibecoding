import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FeatureCardComponent } from '../../shared/components/feature-card/feature-card.component';
import { GlowCardComponent } from '../../shared/components/glow-card/glow-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { ContentService } from '../../core/services/content.service';
import { CodePreviewComponent } from '../visuals/code-preview/code-preview.component';

@Component({
  selector: 'app-vibe-coding',
  imports: [
    AsyncPipe,
    ButtonComponent,
    FeatureCardComponent,
    GlowCardComponent,
    SectionHeaderComponent,
    ScrollRevealDirective,
    CodePreviewComponent
  ],
  templateUrl: './vibe-coding.component.html',
  styleUrl: './vibe-coding.component.scss'
})
export class VibeCodingComponent {
  private readonly contentService = inject(ContentService);

  readonly topic$ = this.contentService.getTopic('vibe-coding');
}
