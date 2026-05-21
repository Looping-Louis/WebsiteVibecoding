import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FeatureCardComponent } from '../../shared/components/feature-card/feature-card.component';
import { GlowCardComponent } from '../../shared/components/glow-card/glow-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { ContentService } from '../../core/services/content.service';
import { AgentFlowComponent } from '../visuals/agent-flow/agent-flow.component';

@Component({
  selector: 'app-ai-agents',
  imports: [
    AsyncPipe,
    ButtonComponent,
    FeatureCardComponent,
    GlowCardComponent,
    SectionHeaderComponent,
    ScrollRevealDirective,
    AgentFlowComponent
  ],
  templateUrl: './ai-agents.component.html',
  styleUrl: './ai-agents.component.scss'
})
export class AiAgentsComponent {
  private readonly contentService = inject(ContentService);

  readonly topic$ = this.contentService.getTopic('ai-agents');
}
