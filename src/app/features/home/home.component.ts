import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FeatureCardComponent } from '../../shared/components/feature-card/feature-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { ContentService } from '../../core/services/content.service';
import { CodePreviewComponent } from '../visuals/code-preview/code-preview.component';
import { ProcessTimelineComponent } from '../visuals/process-timeline/process-timeline.component';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    ButtonComponent,
    FeatureCardComponent,
    SectionHeaderComponent,
    ScrollRevealDirective,
    CodePreviewComponent,
    ProcessTimelineComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly contentService = inject(ContentService);

  readonly page$ = this.contentService.getHomeContent();
}
