import crypto from 'crypto';

const SESSION_TOKEN_LENGTH = 48;

// Генерирует криптографически стойкий токен пользовательской сессии.
export const generateSessionToken = (): string => {
  return crypto.randomBytes(SESSION_TOKEN_LENGTH).toString('hex');
};
