export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  displayName: string;
}

export interface AuthSession {
  email: string;
  displayName: string;
  token: string;
  expiresAt: string;
}

export interface AuthTokenPayload {
  sub: string;
  email: string;
  displayName: string;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  displayName: string;
}
