import { createReadStream } from 'node:fs';
import { unlink } from 'node:fs/promises';

import { QueryResultRow } from 'pg';

import { env } from '../config/env.js';
import { query } from '../db/client.js';
import { ApiError } from '../middleware/api-error.js';
import {
  AiFileUploadResponse,
  AiVectorStoreCreateRequest,
  AiVectorStoreResponse
} from '../models/ai.model.js';
import { AuthenticatedUser } from '../models/auth.model.js';
import { openAiService } from './openai.service.js';

interface VectorStoreRow extends QueryResultRow {
  openai_vector_store_id: string;
}

const allowedUploadExtensions = new Set(['.pdf', '.txt', '.md', '.docx']);

class AiVectorStoreService {
  async create(
    request: AiVectorStoreCreateRequest,
    user: AuthenticatedUser
  ): Promise<AiVectorStoreResponse> {
    try {
      const name = request.name?.trim() || `Website Vibecoding Knowledge ${new Date().toISOString()}`;
      const vectorStore = await openAiService.getClient().vectorStores.create({
        name,
        metadata: {
          source: 'website-vibecoding'
        }
      });

      await query('UPDATE ai_vector_stores SET is_default = false WHERE is_default = true');
      await query(
        `
          INSERT INTO ai_vector_stores (
            openai_vector_store_id,
            name,
            status,
            is_default,
            created_by
          )
          VALUES ($1, $2, $3, true, $4)
          ON CONFLICT (openai_vector_store_id)
          DO UPDATE SET
            name = EXCLUDED.name,
            status = EXCLUDED.status,
            is_default = true,
            created_by = EXCLUDED.created_by
        `,
        [vectorStore.id, vectorStore.name, vectorStore.status, user.id]
      );

      return {
        id: vectorStore.id,
        name: vectorStore.name,
        status: vectorStore.status,
        createdAt: new Date(vectorStore.created_at * 1000).toISOString()
      };
    } catch (error) {
      return openAiService.handleError(error);
    }
  }

  async uploadFile(file: Express.Multer.File, user: AuthenticatedUser): Promise<AiFileUploadResponse> {
    this.validateFile(file);

    const vectorStoreId = await this.getActiveVectorStoreId();

    if (!vectorStoreId) {
      throw new ApiError(409, 'No OpenAI vector store configured');
    }

    try {
      const vectorStoreFile = await openAiService
        .getClient()
        .vectorStores.files.uploadAndPoll(vectorStoreId, createReadStream(file.path));

      await query(
        `
          INSERT INTO ai_vector_store_files (
            openai_vector_store_id,
            openai_file_id,
            filename,
            mime_type,
            bytes,
            status,
            created_by
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
        [
          vectorStoreId,
          vectorStoreFile.id,
          file.originalname,
          file.mimetype || null,
          file.size,
          vectorStoreFile.status,
          user.id
        ]
      );

      return {
        success: true,
        vectorStoreId,
        fileId: vectorStoreFile.id,
        filename: file.originalname,
        status: vectorStoreFile.status
      };
    } catch (error) {
      return openAiService.handleError(error);
    } finally {
      await unlink(file.path).catch(() => undefined);
    }
  }

  async getActiveVectorStoreId(): Promise<string | undefined> {
    const result = await query<VectorStoreRow>(
      `
        SELECT openai_vector_store_id
        FROM ai_vector_stores
        WHERE is_default = true
        ORDER BY created_at DESC
        LIMIT 1
      `
    );

    return result.rows[0]?.openai_vector_store_id || env.openAiVectorStoreId;
  }

  private validateFile(file: Express.Multer.File): void {
    const extension = this.getFileExtension(file.originalname);

    if (!allowedUploadExtensions.has(extension)) {
      throw new ApiError(400, 'Unsupported file type. Allowed: PDF, TXT, MD, DOCX');
    }

    if (!file.size) {
      throw new ApiError(400, 'Uploaded file is empty');
    }
  }

  private getFileExtension(filename: string): string {
    const lastDotIndex = filename.lastIndexOf('.');
    return lastDotIndex >= 0 ? filename.slice(lastDotIndex).toLowerCase() : '';
  }
}

export const aiVectorStoreService = new AiVectorStoreService();
