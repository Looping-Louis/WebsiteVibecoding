import { randomUUID } from 'crypto';

import { ContactRequest, ContactResponse } from '../models/contact.model.js';

class ContactService {
  submit(request: ContactRequest): ContactResponse {
    const referenceId = `contact-${randomUUID()}`;

    console.info('Contact request received', {
      referenceId,
      name: request.name,
      email: request.email,
      topic: request.topic,
      messageLength: request.message.length
    });

    return {
      success: true,
      referenceId
    };
  }
}

export const contactService = new ContactService();
