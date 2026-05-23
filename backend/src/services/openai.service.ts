import OpenAI, { APIError } from 'openai';

import { env } from '../config/env.js';
import { ApiError } from '../middleware/api-error.js';

class OpenAiService {
  private client: OpenAI | null = null;

  getClient(): OpenAI {
    if (!env.openAiApiKey) {
      throw new ApiError(503, 'OpenAI API key is not configured');
    }

    this.client ??= new OpenAI({
      apiKey: env.openAiApiKey
    });

    return this.client;
  }

  handleError(error: unknown): never {
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

export const openAiService = new OpenAiService();
