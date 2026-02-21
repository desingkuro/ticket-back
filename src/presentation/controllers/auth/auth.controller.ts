import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { type Request } from "express";
import { JwtAuthGuard } from "src/core/guards/jwt-auth.guard";

@Controller('auth/me')
export class AuthController {
    constructor() {}

    @Get('')
    @UseGuards(JwtAuthGuard)
    async getMe(@Req() req: Request) {
        return req.user;
    }
}