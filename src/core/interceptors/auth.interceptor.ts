import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const JWT_SECRET = process.env.JWT_SECRET_KEY || 'secretKey';
    const request = context
      .switchToHttp().getRequest();
    const token = request.headers.authorization;
    const paths: string[] = [
      '/auth/login',
      '/auth/register',
      '/auth/refresh'
    ]

    if (paths.includes(request.url) && request.method === 'POST') {
      return next.handle();
    }
    if (!token && !paths.includes(request.url)) {
      throw new UnauthorizedException('Unauthorized');
    }

    if (!token || token.split(' ')[0] !== 'Bearer') {
      throw new UnauthorizedException('Unauthorized, invalid token');
    }

    try {
      const payload = jwt.verify(token.split(' ')[1], JWT_SECRET) as { exp?: number };
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        throw new UnauthorizedException('Token has expired');
      }
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized, invalid token');
    }
    return next.handle();
  }
}
