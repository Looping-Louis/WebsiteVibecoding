import { Router } from 'express';

import { aiRoutes } from './ai.routes.js';
import { authRoutes } from './auth.routes.js';
import { contactRoutes } from './contact.routes.js';
import { healthRoutes } from './health.routes.js';

export const apiRoutes = Router();

apiRoutes.use(healthRoutes);
apiRoutes.use(authRoutes);
apiRoutes.use(contactRoutes);
apiRoutes.use(aiRoutes);
