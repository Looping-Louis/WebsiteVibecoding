import { Router } from 'express';

import { aiController } from '../controllers/ai.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { validateBody } from '../middleware/validate-request.middleware.js';
import { aiGenerateSchema } from '../validators/ai.validator.js';

export const aiRoutes = Router();

aiRoutes.post('/ai/generate', requireAuth, validateBody(aiGenerateSchema), (request, response, next) =>
  aiController.generate(request, response, next)
);
