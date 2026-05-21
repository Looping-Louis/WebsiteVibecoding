import { NextFunction, Request, Response } from 'express';

import { ContactRequest, ContactResponse } from '../models/contact.model.js';
import { contactService } from '../services/contact.service.js';

class ContactController {
  submit(
    request: Request<unknown, ContactResponse, ContactRequest>,
    response: Response<ContactResponse>,
    next: NextFunction
  ): void {
    try {
      response.json(contactService.submit(request.body));
    } catch (error) {
      next(error);
    }
  }
}

export const contactController = new ContactController();
