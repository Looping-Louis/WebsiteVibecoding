import { Router } from 'express';

import { contactController } from '../controllers/contact.controller.js';
import { contactRateLimit } from '../middleware/rate-limit.middleware.js';
import { validateBody } from '../middleware/validate-request.middleware.js';
import { contactSchema } from '../validators/contact.validator.js';

export const contactRoutes = Router();

contactRoutes.post('/contact', contactRateLimit, validateBody(contactSchema), (request, response, next) =>
  contactController.submit(request, response, next)
);
