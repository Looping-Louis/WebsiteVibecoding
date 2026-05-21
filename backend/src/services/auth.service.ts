import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';
import { query } from '../db/client.js';
import { ApiError } from '../middleware/api-error.js';
import { AuthSession, LoginRequest, RegisterRequest } from '../models/auth.model.js';

interface UserRow {
  id: string;
  email: string;
  display_name: string;
  password_hash: string;
  is_active: boolean;
}

class AuthService {
  private readonly passwordSaltRounds = 12;

  async login(request: LoginRequest): Promise<AuthSession> {
    const email = request.email.trim().toLowerCase();
    const user = await this.findUserByEmail(email);

    if (!user || !user.is_active) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const passwordMatches = await compare(request.password, user.password_hash);

    if (!passwordMatches) {
      throw new ApiError(401, 'Invalid email or password');
    }

    return this.createSession({
      id: user.id,
      email: user.email,
      displayName: user.display_name
    });
  }

  async register(request: RegisterRequest): Promise<AuthSession> {
    if (!env.allowRegistration) {
      throw new ApiError(403, 'Registration is disabled');
    }

    const email = request.email.trim().toLowerCase();
    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      throw new ApiError(409, 'Account already exists');
    }

    const passwordHash = await hash(request.password, this.passwordSaltRounds);
    const result = await query<UserRow>(
      `
        INSERT INTO users (email, display_name, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, email, display_name, password_hash, is_active
      `,
      [email, request.displayName.trim(), passwordHash]
    );

    const user = result.rows[0];

    if (!user) {
      throw new ApiError(500, 'Account could not be created');
    }

    return this.createSession({
      id: user.id,
      email: user.email,
      displayName: user.display_name
    });
  }

  private async findUserByEmail(email: string): Promise<UserRow | null> {
    const result = await query<UserRow>(
      `
        SELECT id, email, display_name, password_hash, is_active
        FROM users
        WHERE lower(email) = lower($1)
        LIMIT 1
      `,
      [email]
    );

    return result.rows[0] ?? null;
  }

  private createSession(user: { id: string; email: string; displayName: string }): AuthSession {
    const ttlSeconds = env.jwtExpiresInHours * 60 * 60;
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString();
    const token = jwt.sign(
      {
        email: user.email,
        displayName: user.displayName
      },
      env.jwtSecret,
      {
        subject: user.id,
        expiresIn: ttlSeconds
      }
    );

    return {
      email: user.email,
      displayName: user.displayName,
      token,
      expiresAt
    };
  }
}

export const authService = new AuthService();
