import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss'
})
export class SectionHeaderComponent {
  @Input() eyebrow = '';
  @Input({ required: true }) title = '';
  @Input() text = '';
  @Input() align: 'left' | 'center' = 'left';
}
