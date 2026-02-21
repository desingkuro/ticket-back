import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

function extractJwtFromCookie(req: Request): string | null {
    if (req?.cookies) {
        return req.cookies['access_token'];
    }
    return null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                extractJwtFromCookie,
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY as string,
        });
    }

    async validate(payload: any) {
        return payload;
    }
}