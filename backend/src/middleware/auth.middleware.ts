import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';
import { AuthTokenPayload } from '../models/auth.model.js';

export interface AuthenticatedRequest extends Request {
  user?: AuthTokenPayload;
}

const isAuthTokenPayload = (payload: unknown): payload is AuthTokenPayload => {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'email' in payload &&
    'displayName' in payload &&
    typeof payload.email === 'string' &&
    typeof payload.displayName === 'string'
  );
};

export const requireAuth = (
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction
): void => {
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

    request.user = {
      email: payload.email,
      displayName: payload.displayName
    };
    next();
  } catch {
    response.status(401).json({
      message: 'Invalid or expired bearer token'
    });
  }
};
