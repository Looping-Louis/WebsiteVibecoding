import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-code-preview',
  templateUrl: './code-preview.component.html',
  styleUrl: './code-preview.component.scss'
})
export class CodePreviewComponent {
  @Input() compact = false;

  readonly statuses = ['Planning', 'Generating', 'Testing', 'Optimizing'];
  readonly agentCards = ['UI Agent', 'Review Agent', 'Test Agent'];
  readonly codeLines = [
    'const product = await idea.toPrototype();',
    'agent.plan(scope).generate(uiFlow);',
    'review.check(accessibility, states);',
    'deploy.when(confidence > 0.92);'
  ];
}
