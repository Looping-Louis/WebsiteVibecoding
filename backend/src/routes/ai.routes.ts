import { Router } from 'express';

import { aiController } from '../controllers/ai.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { aiChatRateLimit } from '../middleware/rate-limit.middleware.js';
import { uploadKnowledgeFile } from '../middleware/upload.middleware.js';
import { validateBody } from '../middleware/validate-request.middleware.js';
import { aiChatSchema, aiGenerateSchema, aiVectorStoreCreateSchema } from '../validators/ai.validator.js';

export const aiRoutes = Router();

aiRoutes.post(
  '/ai/vector-store/create',
  requireAuth,
  validateBody(aiVectorStoreCreateSchema),
  (request, response, next) => aiController.createVectorStore(request, response, next)
);

aiRoutes.post('/ai/files/upload', requireAuth, uploadKnowledgeFile.single('file'), (request, response, next) =>
  aiController.uploadFile(request, response, next)
);

aiRoutes.post('/ai/chat', aiChatRateLimit, requireAuth, validateBody(aiChatSchema), (request, response, next) =>
  aiController.chat(request, response, next)
);

aiRoutes.post('/ai/generate', aiChatRateLimit, requireAuth, validateBody(aiGenerateSchema), (request, response, next) =>
  aiController.generate(request, response, next)
);
