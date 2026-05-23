import OpenAI, { APIError } from 'openai';

import { env } from '../config/env.js';
import { query } from '../db/client.js';
import { ApiError } from '../middleware/api-error.js';
import { AiGenerateRequest, AiMessage } from '../models/ai.model.js';
import { AuthenticatedUser } from '../models/auth.model.js';

class AiService {
  private client: OpenAI | null = null;

  async chat(message: string, user: AuthenticatedUser): Promise<string> {
    const trimmedMessage = message.trim();

    try {
      const response = await this.getClient().responses.create({
        model: env.openAiModel,
        instructions:
          'Du bist ein hilfreicher KI-Assistent für diese Website. Antworte klar, freundlich und kurz.',
        input: trimmedMessage
      });

      const reply = response.output_text.trim();

      if (!reply) {
        throw new ApiError(502, 'OpenAI returned an empty response');
      }

      await this.saveGeneration(user.id, trimmedMessage, reply, 'openai-responses');

      return reply;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof APIError) {
        console.error('OpenAI API request failed', {
          status: error.status,
          code: error.code,
          type: error.type
        });

        if (error.status === 429) {
          throw new ApiError(429, 'OpenAI rate limit reached');
        }

        throw new ApiError(502, 'OpenAI request failed');
      }

      throw error;
    }
  }

  async generate(request: AiGenerateRequest, user: AuthenticatedUser): Promise<AiMessage> {
    const content = await this.chat(request.prompt, user);

    return {
      role: 'assistant',
      content,
      createdAt: new Date().toISOString()
    };
  }

  private getClient(): OpenAI {
    if (!env.openAiApiKey) {
      throw new ApiError(503, 'OpenAI API key is not configured');
    }

    this.client ??= new OpenAI({
      apiKey: env.openAiApiKey
    });

    return this.client;
  }

  private async saveGeneration(
    userId: string,
    prompt: string,
    responseContent: string,
    provider: string
  ): Promise<void> {
    await query(
      `
        INSERT INTO ai_generations (user_id, prompt, response_content, provider)
        VALUES ($1, $2, $3, $4)
      `,
      [userId, prompt, responseContent, provider]
    );
  }
}

export const aiService = new AiService();
