import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthSession, LoginRequest } from '../models';

const STORAGE_KEY = 'ai-native-studio-session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly endpoint = `${environment.apiBaseUrl}${environment.authEndpoint}`;
  private readonly sessionSubject = new BehaviorSubject<AuthSession | null>(this.readSession());

  readonly session$ = this.sessionSubject.asObservable();
  readonly isAuthenticated$ = this.session$.pipe(map(Boolean));

  isAuthenticated(): boolean {
    return Boolean(this.sessionSubject.value);
  }

  login(request: LoginRequest): Observable<boolean> {
    void this.endpoint;

    const validDemoLogin =
      request.email.trim().toLowerCase() === 'demo@ai.local' && request.password === 'demo1234';

    return of(validDemoLogin).pipe(
      delay(450),
      tap((success) => {
        if (!success) {
          return;
        }

        const session: AuthSession = {
          email: request.email.trim().toLowerCase(),
          displayName: 'Demo User',
          token: `local-demo-${Date.now()}`,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString()
        };

        this.persistSession(session);
      })
    );
  }

  logout(): void {
    this.sessionSubject.next(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  private persistSession(session: AuthSession): void {
    this.sessionSubject.next(session);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    }
  }

  private readSession(): AuthSession | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    const rawSession = localStorage.getItem(STORAGE_KEY);
    if (!rawSession) {
      return null;
    }

    try {
      const session = JSON.parse(rawSession) as AuthSession;
      if (new Date(session.expiresAt).getTime() <= Date.now()) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }

      return session;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }
}
