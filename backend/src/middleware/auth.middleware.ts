import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';
import { query } from '../db/client.js';
import { AuthenticatedUser, AuthTokenPayload } from '../models/auth.model.js';

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

interface ActiveUserRow {
  id: string;
  email: string;
  display_name: string;
}

const isAuthTokenPayload = (payload: unknown): payload is AuthTokenPayload => {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'sub' in payload &&
    'email' in payload &&
    'displayName' in payload &&
    typeof payload.sub === 'string' &&
    typeof payload.email === 'string' &&
    typeof payload.displayName === 'string'
  );
};

export const requireAuth = async (
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const authorization = request.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    response.status(401).json({
      message: 'Missing bearer token'
    });
    return;
  }

  try {
    const token = authorization.slice('Bearer '.length);
    const payload = jwt.verify(token, env.jwtSecret);

    if (!isAuthTokenPayload(payload)) {
      response.status(401).json({
        message: 'Invalid bearer token'
      });
      return;
    }

    const result = await query<ActiveUserRow>(
      `
        SELECT id, email, display_name
        FROM users
        WHERE id = $1 AND is_active = true
        LIMIT 1
      `,
      [payload.sub]
    );
    const user = result.rows[0];

    if (!user) {
      response.status(401).json({
        message: 'Invalid bearer token'
      });
      return;
    }

    request.user = {
      id: user.id,
      email: user.email,
      displayName: user.display_name
    };
    next();
  } catch {
    response.status(401).json({
      message: 'Invalid or expired bearer token'
    });
  }
};
