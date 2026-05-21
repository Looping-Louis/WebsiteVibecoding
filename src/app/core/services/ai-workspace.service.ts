import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AiGenerateRequest, AiMessage } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AiWorkspaceService {
  private readonly endpoint = `${environment.apiBaseUrl}${environment.aiEndpoint}`;

  generate(request: AiGenerateRequest): Observable<AiMessage> {
    void this.endpoint;

    return of({
      role: 'assistant' as const,
      content:
        `KI-Anbindung vorbereitet. Später wird dieser Prompt an ${environment.aiEndpoint} gesendet: "${request.prompt}"`,
      createdAt: new Date().toISOString()
    }).pipe(delay(500));
  }
}
