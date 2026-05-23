import { Component, Input } from '@angular/core';
import { ComparisonItem } from '../../../core/models';

@Component({
  selector: 'app-comparison-cards',
  templateUrl: './comparison-cards.component.html',
  styleUrl: './comparison-cards.component.scss'
})
export class ComparisonCardsComponent {
  @Input() items: ComparisonItem[] | null = [];
}
