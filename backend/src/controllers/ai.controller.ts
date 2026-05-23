import { NextFunction, Request, Response } from 'express';

import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { ApiError } from '../middleware/api-error.js';
import {
  AiChatRequest,
  AiChatResponse,
  AiFileUploadResponse,
  AiGenerateRequest,
  AiMessage,
  AiVectorStoreCreateRequest,
  AiVectorStoreResponse
} from '../models/ai.model.js';
import { aiVectorStoreService } from '../services/ai-vector-store.service.js';
import { aiService } from '../services/ai.service.js';

class AiController {
  async chat(
    request: Request<unknown, AiChatResponse, AiChatRequest> & AuthenticatedRequest,
    response: Response<AiChatResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!request.user) {
        response.status(401).json({
          reply: 'Unauthorized'
        });
        return;
      }

      response.json({
        reply: await aiService.chat(request.body.message, request.user)
      });
    } catch (error) {
      next(error);
    }
  }

  async generate(
    request: Request<unknown, AiMessage, AiGenerateRequest> & AuthenticatedRequest,
    response: Response<AiMessage>,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!request.user) {
        response.status(401).json({
          role: 'assistant',
          content: 'Unauthorized',
          createdAt: new Date().toISOString()
        });
        return;
      }

      response.json(await aiService.generate(request.body, request.user));
    } catch (error) {
      next(error);
    }
  }

  async createVectorStore(
    request: Request<unknown, AiVectorStoreResponse, AiVectorStoreCreateRequest> & AuthenticatedRequest,
    response: Response<AiVectorStoreResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!request.user) {
        throw new ApiError(401, 'Unauthorized');
      }

      response.status(201).json(await aiVectorStoreService.create(request.body, request.user));
    } catch (error) {
      next(error);
    }
  }

  async uploadFile(
    request: Request & AuthenticatedRequest,
    response: Response<AiFileUploadResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!request.user) {
        throw new ApiError(401, 'Unauthorized');
      }

      if (!request.file) {
        throw new ApiError(400, 'File is required');
      }

      response.status(201).json(await aiVectorStoreService.uploadFile(request.file, request.user));
    } catch (error) {
      next(error);
    }
  }
}

export const aiController = new AiController();
