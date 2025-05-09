import { parse } from 'cookie';
import type { Header } from 'encore.dev/api';
import { APIError, Gateway } from 'encore.dev/api';
import { authHandler } from 'encore.dev/auth';
import { secret } from 'encore.dev/config';
import log from 'encore.dev/log';
import jwt, { type JwtPayload } from 'jsonwebtoken';

import { User } from '../sequelize/database';

interface AuthParams {
  authorization: Header<'Authorization'>;
  cookie: Header<'Cookie'>;
}

interface AuthData {
  userID: string;
  email: string;
  role?: string;
  refreshToken?: string;
}

const jwtSecret = secret('MAILGUN_API_KEY');

const myAuthHandler = authHandler(async (params: AuthParams): Promise<AuthData> => {
  const cookies = parse(params.cookie);
  const token = params.authorization.replace('Bearer ', '');
  const refreshToken = cookies['refreshToken'];

  if (!token) {
    throw APIError.unauthenticated('no token provided');
  }

  try {
    const decoded = jwt.decode(token, { complete: true }) as JwtPayload;
    const user = await User.findOne({ where: { id: decoded.payload.id }, raw: true });
    if (!user) {
      throw APIError.unauthenticated('user not found');
    }
    if (user.signed_out) {
      throw APIError.unauthenticated('user signed out');
    }
    await jwt.verify(token, Buffer.from(jwtSecret(), 'base64'));

    return {
      userID: decoded.payload.id,
      email: decoded.payload.email,
      role: decoded.payload.role ?? '',
      refreshToken,
    };
  } catch (e) {
    log.error(e);
    throw APIError.unauthenticated('invalid token', e as Error);
  }
});

export const mygw = new Gateway({ authHandler: myAuthHandler });
