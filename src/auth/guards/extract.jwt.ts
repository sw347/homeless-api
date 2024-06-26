import { Request } from 'express';

export const extractJwt = (req: Request): string | null => {
  const auth = req.headers.authorization;
  if (auth === null) return null;

  const [header, token] = auth.split(' ');
  if (header !== 'Bearer') return null;
  return token;
};
