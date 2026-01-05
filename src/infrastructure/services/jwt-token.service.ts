import { Injectable } from '@nestjs/common';
import { TokenPayload, TokenService } from 'src/domain/services/token.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtTokenService implements TokenService {
  sign(payload: TokenPayload): string {
    const secretKey = process.env.SECRET_KEY_TOKEN;
    const expiresInEnv = process.env.JWT_EXPIRATION_TIME;
    const expiresIn: jwt.SignOptions['expiresIn'] =
      expiresInEnv && /^\d+$/.test(expiresInEnv)
        ? Number(expiresInEnv)
        : (expiresInEnv as unknown as jwt.SignOptions['expiresIn']) ?? '1h';

    if (!secretKey || typeof secretKey !== 'string' || secretKey.trim() === '') {
      throw new Error('SECRET_KEY_TOKEN is not defined in environment variables');
    }

    return jwt.sign(payload as object, secretKey, { expiresIn });
  }
}
