import { Component, Input } from '@angular/core';
import { ProcessStep } from '../../../core/models';

@Component({
  selector: 'app-process-timeline',
  templateUrl: './process-timeline.component.html',
  styleUrl: './process-timeline.component.scss'
})
export class ProcessTimelineComponent {
  @Input() steps: ProcessStep[] | null = [];
}
