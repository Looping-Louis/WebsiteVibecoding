import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';
import { ApiError } from '../middleware/api-error.js';
import { AuthSession, LoginRequest } from '../models/auth.model.js';

class AuthService {
  private readonly displayName = 'Demo User';
  private readonly tokenTtlSeconds = 8 * 60 * 60;

  login(request: LoginRequest): AuthSession {
    const email = request.email.trim().toLowerCase();

    if (email !== env.demoEmail.toLowerCase() || request.password !== env.demoPassword) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const expiresAt = new Date(Date.now() + this.tokenTtlSeconds * 1000).toISOString();
    const token = jwt.sign(
      {
        email,
        displayName: this.displayName
      },
      env.jwtSecret,
      {
        expiresIn: this.tokenTtlSeconds
      }
    );

    return {
      email,
      displayName: this.displayName,
      token,
      expiresAt
    };
  }
}

export const authService = new AuthService();
