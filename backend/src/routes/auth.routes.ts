import { Router } from 'express';

import { authController } from '../controllers/auth.controller.js';
import { loginRateLimit } from '../middleware/rate-limit.middleware.js';
import { validateBody } from '../middleware/validate-request.middleware.js';
import { loginSchema, registerSchema } from '../validators/auth.validator.js';

export const authRoutes = Router();

authRoutes.post('/auth/login', loginRateLimit, validateBody(loginSchema), (request, response, next) =>
  authController.login(request, response, next)
);

authRoutes.post('/auth/register', validateBody(registerSchema), (request, response, next) =>
  authController.register(request, response, next)
);
