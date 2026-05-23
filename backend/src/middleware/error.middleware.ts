import { ErrorRequestHandler } from 'express';
import multer from 'multer';

import { ApiError } from './api-error.js';

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ApiError) {
    response.status(error.statusCode).json({
      message: error.message,
      details: error.details
    });
    return;
  }

  if (error instanceof multer.MulterError) {
    response.status(error.code === 'LIMIT_FILE_SIZE' ? 413 : 400).json({
      message: error.message
    });
    return;
  }

  console.error(error);
  response.status(500).json({
    message: 'Internal server error'
  });
};
