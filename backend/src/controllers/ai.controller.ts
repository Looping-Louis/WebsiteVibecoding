import { NextFunction, Request, Response } from 'express';

import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { AiGenerateRequest, AiMessage } from '../models/ai.model.js';
import { aiService } from '../services/ai.service.js';

class AiController {
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
}

export const aiController = new AiController();
