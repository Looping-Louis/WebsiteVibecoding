export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthSession {
  email: string;
  displayName: string;
  token: string;
  expiresAt: string;
}

export interface AuthTokenPayload {
  email: string;
  displayName: string;
}
