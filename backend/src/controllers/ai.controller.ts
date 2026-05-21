import { NextFunction, Request, Response } from 'express';

import { AiGenerateRequest, AiMessage } from '../models/ai.model.js';
import { aiService } from '../services/ai.service.js';

class AiController {
  async generate(
    request: Request<unknown, AiMessage, AiGenerateRequest>,
    response: Response<AiMessage>,
    next: NextFunction
  ): Promise<void> {
    try {
      response.json(await aiService.generate(request.body));
    } catch (error) {
      next(error);
    }
  }
}

export const aiController = new AiController();
