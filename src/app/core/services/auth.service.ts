import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthSession, LoginRequest } from '../models';

const STORAGE_KEY = 'ai-native-studio-session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiBaseUrl}${environment.authEndpoint}`;
  private readonly sessionSubject = new BehaviorSubject<AuthSession | null>(this.readSession());

  readonly session$ = this.sessionSubject.asObservable();
  readonly isAuthenticated$ = this.session$.pipe(map(Boolean));

  isAuthenticated(): boolean {
    return Boolean(this.sessionSubject.value);
  }

  login(request: LoginRequest): Observable<boolean> {
    const credentials: LoginRequest = {
      email: request.email.trim().toLowerCase(),
      password: request.password
    };

    return this.http.post<AuthSession>(this.endpoint, credentials).pipe(
      tap((session) => this.persistSession(session)),
      map(() => true),
      catchError(() => of(false))
    );
  }

  getToken(): string | null {
    return this.sessionSubject.value?.token ?? null;
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
