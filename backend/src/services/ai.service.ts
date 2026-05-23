import type { ResponseFileSearchToolCall } from 'openai/resources/responses/responses';

import { env } from '../config/env.js';
import { query } from '../db/client.js';
import { ApiError } from '../middleware/api-error.js';
import { AiGenerateRequest, AiMessage } from '../models/ai.model.js';
import { AuthenticatedUser } from '../models/auth.model.js';
import { aiVectorStoreService } from './ai-vector-store.service.js';
import { openAiService } from './openai.service.js';

const ragInstructions = `
Du bist ein Assistent für diese Website.
Nutze primär die bereitgestellten Dokumente.
Wenn die Dokumente keine Antwort enthalten, sage das ehrlich.
Antworte kurz, klar und hilfreich.
`;

class AiService {
  async chat(message: string, user: AuthenticatedUser): Promise<string> {
    const trimmedMessage = message.trim();
    const vectorStoreId = await aiVectorStoreService.getActiveVectorStoreId();

    if (!vectorStoreId) {
      throw new ApiError(409, 'No OpenAI vector store configured');
    }

    try {
      const response = await openAiService.getClient().responses.create({
        model: env.openAiModel,
        instructions: ragInstructions,
        input: trimmedMessage,
        tools: [
          {
            type: 'file_search',
            vector_store_ids: [vectorStoreId]
          }
        ],
        include: ['file_search_call.results']
      });

      if (!this.hasFileSearchResults(response.output)) {
        const noDocumentAnswer = 'Ich finde dazu keine Information in den hinterlegten Dokumenten.';
        await this.saveGeneration(
          user.id,
          trimmedMessage,
          noDocumentAnswer,
          'openai-responses-file-search',
          vectorStoreId
        );
        return noDocumentAnswer;
      }

      const reply = response.output_text.trim();

      if (!reply) {
        throw new ApiError(502, 'OpenAI returned an empty response');
      }

      await this.saveGeneration(
        user.id,
        trimmedMessage,
        reply,
        'openai-responses-file-search',
        vectorStoreId
      );

      return reply;
    } catch (error) {
      return openAiService.handleError(error);
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

  private async saveGeneration(
    userId: string,
    prompt: string,
    responseContent: string,
    provider: string,
    vectorStoreId: string | null
  ): Promise<void> {
    await query(
      `
        INSERT INTO ai_generations (user_id, prompt, response_content, provider, vector_store_id)
        VALUES ($1, $2, $3, $4, $5)
      `,
      [userId, prompt, responseContent, provider, vectorStoreId]
    );
  }

  private hasFileSearchResults(output: unknown[]): boolean {
    return output.some((item): item is ResponseFileSearchToolCall => {
      if (!this.isFileSearchToolCall(item)) {
        return false;
      }

      return Array.isArray(item.results) && item.results.length > 0;
    });
  }

  private isFileSearchToolCall(item: unknown): item is ResponseFileSearchToolCall {
    return (
      typeof item === 'object' &&
      item !== null &&
      'type' in item &&
      item.type === 'file_search_call'
    );
  }
}

export const aiService = new AiService();
