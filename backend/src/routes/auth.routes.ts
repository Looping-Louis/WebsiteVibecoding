import { Router } from 'express';

import { authController } from '../controllers/auth.controller.js';
import { validateBody } from '../middleware/validate-request.middleware.js';
import { loginSchema } from '../validators/auth.validator.js';

export const authRoutes = Router();

authRoutes.post('/auth/login', validateBody(loginSchema), (request, response, next) =>
  authController.login(request, response, next)
);
