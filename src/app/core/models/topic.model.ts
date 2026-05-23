import { Feature } from './feature.model';

export type TopicId = 'vibe-coding' | 'ai-agents' | 'fine-tuning';

export interface Topic {
  id: TopicId;
  route: string;
  eyebrow: string;
  title: string;
  summary: string;
  paragraphs: string[];
  features: Feature[];
  highlights: string[];
  ctaLabel: string;
}
