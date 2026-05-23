import { env } from '../config/env.js';
import { query } from '../db/client.js';
import { AiGenerateRequest, AiMessage } from '../models/ai.model.js';
import { AuthenticatedUser } from '../models/auth.model.js';

class AiService {
  async generate(request: AiGenerateRequest, user: AuthenticatedUser): Promise<AiMessage> {
    const provider = env.openAiApiKey ? 'configured-provider-placeholder' : 'local-fallback';
    const content = env.openAiApiKey
      ? this.buildProviderReadyResponse(request.prompt)
      : this.buildLocalFallbackResponse(request.prompt);

    const message: AiMessage = {
      role: 'assistant',
      content,
      createdAt: new Date().toISOString()
    };

    await query(
      `
        INSERT INTO ai_generations (user_id, prompt, response_content, provider)
        VALUES ($1, $2, $3, $4)
      `,
      [user.id, request.prompt.trim(), message.content, provider]
    );

    return message;
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
