import { NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Feature } from '../../../core/models';

@Component({
  selector: 'app-feature-card',
  imports: [NgTemplateOutlet, RouterLink],
  templateUrl: './feature-card.component.html',
  styleUrl: './feature-card.component.scss'
})
export class FeatureCardComponent {
  @Input({ required: true }) feature!: Feature;
}
