import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AiChatResponse, AiGenerateRequest, AiMessage } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AiWorkspaceService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiBaseUrl}${environment.aiEndpoint}`;

  generate(request: AiGenerateRequest): Observable<AiMessage> {
    return this.chat(request.prompt).pipe(
      map((response) => ({
        role: 'assistant' as const,
        content: response.reply,
        createdAt: new Date().toISOString()
      }))
    );
  }

  chat(message: string): Observable<AiChatResponse> {
    return this.http.post<AiChatResponse>(this.endpoint, {
      message
    });
  }
}
