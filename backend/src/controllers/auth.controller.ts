import { NextFunction, Request, Response } from 'express';

import { AuthSession, LoginRequest, RegisterRequest } from '../models/auth.model.js';
import { authService } from '../services/auth.service.js';

class AuthController {
  async login(
    request: Request<unknown, AuthSession, LoginRequest>,
    response: Response<AuthSession>,
    next: NextFunction
  ): Promise<void> {
    try {
      response.json(await authService.login(request.body));
    } catch (error) {
      next(error);
    }
  }

  async register(
    request: Request<unknown, AuthSession, RegisterRequest>,
    response: Response<AuthSession>,
    next: NextFunction
  ): Promise<void> {
    try {
      response.status(201).json(await authService.register(request.body));
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
