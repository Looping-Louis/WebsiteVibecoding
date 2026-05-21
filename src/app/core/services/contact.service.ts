import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ContactRequest, ContactResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly endpoint = `${environment.apiBaseUrl}${environment.contactEndpoint}`;

  submitContact(request: ContactRequest): Observable<ContactResponse> {
    void this.endpoint;
    void request;

    return of({
      success: true,
      referenceId: `local-${Date.now()}`
    }).pipe(delay(650));
  }
}
