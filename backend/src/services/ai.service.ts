import { env } from '../config/env.js';
import { AiGenerateRequest, AiMessage } from '../models/ai.model.js';

class AiService {
  async generate(request: AiGenerateRequest): Promise<AiMessage> {
    const content = env.openAiApiKey
      ? this.buildProviderReadyResponse(request.prompt)
      : this.buildLocalFallbackResponse(request.prompt);

    return {
      role: 'assistant',
      content,
      createdAt: new Date().toISOString()
    };
  }

  private buildLocalFallbackResponse(prompt: string): string {
    return [
      'Lokale Fallback-Antwort aus dem Backend.',
      `Dein Prompt wurde empfangen: "${prompt}"`,
      'Setze OPENAI_API_KEY, um später einen echten Provider in AiService anzubinden.'
    ].join(' ');
  }

  private buildProviderReadyResponse(prompt: string): string {
    return [
      'OPENAI_API_KEY ist gesetzt.',
      'Die Provider-Struktur ist vorbereitet und kann in AiService gegen einen echten Client getauscht werden.',
      `Empfangener Prompt: "${prompt}"`
    ].join(' ');
  }
}

export const aiService = new AiService();
