import { NextFunction, Request, Response } from 'express';

import { AuthSession, LoginRequest } from '../models/auth.model.js';
import { authService } from '../services/auth.service.js';

class AuthController {
  login(
    request: Request<unknown, AuthSession, LoginRequest>,
    response: Response<AuthSession>,
    next: NextFunction
  ): void {
    try {
      response.json(authService.login(request.body));
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
