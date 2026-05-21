import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FeatureCardComponent } from '../../shared/components/feature-card/feature-card.component';
import { GlowCardComponent } from '../../shared/components/glow-card/glow-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { ContentService } from '../../core/services/content.service';
import { ComparisonCardsComponent } from '../visuals/comparison-cards/comparison-cards.component';
import { FineTuningPipelineComponent } from '../visuals/fine-tuning-pipeline/fine-tuning-pipeline.component';

@Component({
  selector: 'app-fine-tuning',
  imports: [
    AsyncPipe,
    ButtonComponent,
    FeatureCardComponent,
    GlowCardComponent,
    SectionHeaderComponent,
    ScrollRevealDirective,
    ComparisonCardsComponent,
    FineTuningPipelineComponent
  ],
  templateUrl: './fine-tuning.component.html',
  styleUrl: './fine-tuning.component.scss'
})
export class FineTuningComponent {
  private readonly contentService = inject(ContentService);

  readonly topic$ = this.contentService.getTopic('fine-tuning');
  readonly comparison$ = this.contentService.getFineTuningComparison();
}
