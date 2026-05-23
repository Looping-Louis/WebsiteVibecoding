import rateLimit from 'express-rate-limit';

export const aiChatRateLimit = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many AI requests. Please try again later.'
  }
});
