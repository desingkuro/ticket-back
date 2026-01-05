import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { CreateUserAdminService } from 'src/application/auth/register/create-user-admin.service';
import { CreateUserAdminDto } from 'src/presentation/dtos/auth/register/create-user-admin.dto';


@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: CreateUserAdminService) {}

  @Post()
  create(@Body() createUserAdminDto: CreateUserAdminDto): Promise<{ message: string, code: number }> {
    return this.registerService.create(createUserAdminDto);
  }
}
