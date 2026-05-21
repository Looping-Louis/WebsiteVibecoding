import { Component } from '@angular/core';

@Component({
  selector: 'app-fine-tuning-pipeline',
  templateUrl: './fine-tuning-pipeline.component.html',
  styleUrl: './fine-tuning-pipeline.component.scss'
})
export class FineTuningPipelineComponent {
  readonly steps = ['Dataset', 'Cleaning', 'Training', 'Evaluation', 'Custom Model'];
}
