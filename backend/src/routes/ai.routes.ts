import { Router } from 'express';

import { aiController } from '../controllers/ai.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { validateBody } from '../middleware/validate-request.middleware.js';
import { aiChatSchema, aiGenerateSchema } from '../validators/ai.validator.js';

export const aiRoutes = Router();

aiRoutes.post('/ai/chat', requireAuth, validateBody(aiChatSchema), (request, response, next) =>
  aiController.chat(request, response, next)
);

aiRoutes.post('/ai/generate', requireAuth, validateBody(aiGenerateSchema), (request, response, next) =>
  aiController.generate(request, response, next)
);
