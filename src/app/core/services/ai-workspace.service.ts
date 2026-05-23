import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AiGenerateRequest, AiMessage } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AiWorkspaceService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiBaseUrl}${environment.aiEndpoint}`;

  generate(request: AiGenerateRequest): Observable<AiMessage> {
    return this.http.post<AiMessage>(this.endpoint, request);
  }
}
