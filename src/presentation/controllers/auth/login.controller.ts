import {
  Body,
  Controller,
  Headers,
  Post,
} from '@nestjs/common';
import { LoginService } from 'src/application/auth/login/login.service';
import { LoginDto } from 'src/presentation/dtos/auth/login/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post()
  create(@Body() createLoginDto: LoginDto, @Headers('x-secret-key') secretKey: string): Promise<{ message: string, code: number, token: string }> {
    return this.loginService.login(createLoginDto, secretKey);
  }

}
