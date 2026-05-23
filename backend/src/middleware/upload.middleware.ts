import { randomUUID } from 'node:crypto';
import os from 'node:os';
import path from 'node:path';

import multer from 'multer';

import { ApiError } from './api-error.js';

const allowedExtensions = new Set(['.pdf', '.txt', '.md', '.docx']);

const storage = multer.diskStorage({
  destination: os.tmpdir(),
  filename: (_request, file, callback) => {
    callback(null, `${randomUUID()}${path.extname(file.originalname).toLowerCase()}`);
  }
});

export const uploadKnowledgeFile = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024,
    files: 1
  },
  fileFilter: (_request, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.has(extension)) {
      callback(new ApiError(400, 'Unsupported file type. Allowed: PDF, TXT, MD, DOCX'));
      return;
    }

    callback(null, true);
  }
});
