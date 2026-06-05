import crypto from 'crypto';

export const generateSessionToken = () => {
  return crypto.randomBytes(48).toString('hex');
};
