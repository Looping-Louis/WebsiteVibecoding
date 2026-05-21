import { randomUUID } from 'crypto';

import { query } from '../db/client.js';
import { ContactRequest, ContactResponse } from '../models/contact.model.js';

class ContactService {
  async submit(request: ContactRequest): Promise<ContactResponse> {
    const referenceId = `contact-${randomUUID()}`;

    await query(
      `
        INSERT INTO contact_requests (reference_id, name, email, topic, message)
        VALUES ($1, $2, $3, $4, $5)
      `,
      [
        referenceId,
        request.name.trim(),
        request.email.trim().toLowerCase(),
        request.topic.trim(),
        request.message.trim()
      ]
    );

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
