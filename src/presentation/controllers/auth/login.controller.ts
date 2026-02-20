import {
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { type Response } from 'express';
import { LoginService } from 'src/application/auth/login/login.service';
import { LoginDto } from 'src/presentation/dtos/auth/login/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post()
  async create(
    @Body() createLoginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.loginService.login(createLoginDto);

    res.cookie('access_token', result.token, {
      httpOnly: true,           // 🔒 No accesible desde JS
      secure: false,            // ⚠ true en producción (HTTPS)
      sameSite: 'lax',          // strict en producción
      maxAge: 1000 * 60 * 60,   // 1 hora
    });

    return {
      message: result.message,
      code: result.code,
    };
  }
}