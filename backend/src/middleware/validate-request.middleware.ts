import { RequestHandler } from 'express';
import { ZodSchema } from 'zod';

export const validateBody =
  (schema: ZodSchema): RequestHandler =>
  (request, response, next): void => {
    const result = schema.safeParse(request.body);

    if (!result.success) {
      response.status(400).json({
        message: 'Validation failed',
        errors: result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message
        }))
      });
      return;
    }

    request.body = result.data;
    next();
  };
