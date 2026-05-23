import { Component } from '@angular/core';

interface AgentNode {
  title: string;
  meta: string;
}

@Component({
  selector: 'app-agent-flow',
  templateUrl: './agent-flow.component.html',
  styleUrl: './agent-flow.component.scss'
})
export class AgentFlowComponent {
  readonly nodes: AgentNode[] = [
    { title: 'User Input', meta: 'Ziel & Kontext' },
    { title: 'Planner', meta: 'Aufgaben zerlegen' },
    { title: 'Tools', meta: 'APIs & Systeme' },
    { title: 'Memory', meta: 'Kontext halten' },
    { title: 'Output', meta: 'Prüfen & liefern' }
  ];
}
