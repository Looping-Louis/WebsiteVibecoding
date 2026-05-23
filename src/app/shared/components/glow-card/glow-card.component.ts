import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-glow-card',
  templateUrl: './glow-card.component.html',
  styleUrl: './glow-card.component.scss'
})
export class GlowCardComponent {
  @Input() tone: 'blue' | 'violet' | 'cyan' = 'blue';
}
