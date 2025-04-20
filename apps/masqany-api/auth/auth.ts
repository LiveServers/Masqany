import type { Header } from 'encore.dev/api';
import { APIError, Gateway } from 'encore.dev/api';
import { authHandler } from 'encore.dev/auth';
import { secret } from 'encore.dev/config';
import log from 'encore.dev/log';
import jwt, { type JwtPayload } from 'jsonwebtoken';

interface AuthParams {
  authorization: Header<'Authorization'>;
}

interface AuthData {
  userID: string;
  email: string;
  role?: string;
}

const jwtSecret = secret('MAILGUN_API_KEY');

const myAuthHandler = authHandler(async (params: AuthParams): Promise<AuthData> => {
  const token = params.authorization.replace('Bearer ', '');

  if (!token) {
    throw APIError.unauthenticated('no token provided');
  }

  try {
    const decoded = jwt.decode(token, { complete: true }) as JwtPayload;
    await jwt.verify(token, Buffer.from(jwtSecret(), 'base64'));

    return {
      userID: decoded.payload.id,
      email: decoded.payload.email,
      role: decoded.payload.role ?? '',
    };
  } catch (e) {
    log.error(e);
    throw APIError.unauthenticated('invalid token', e as Error);
  }
});

export const mygw = new Gateway({ authHandler: myAuthHandler });
