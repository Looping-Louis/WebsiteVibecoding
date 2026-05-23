import { NextFunction, Request, Response } from 'express';

import { ContactRequest, ContactResponse } from '../models/contact.model.js';
import { contactService } from '../services/contact.service.js';

class ContactController {
  async submit(
    request: Request<unknown, ContactResponse, ContactRequest>,
    response: Response<ContactResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      response.json(await contactService.submit(request.body));
    } catch (error) {
      next(error);
    }
  }
}

export const contactController = new ContactController();
