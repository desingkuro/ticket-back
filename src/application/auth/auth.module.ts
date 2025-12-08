import { Module } from '@nestjs/common';
import { CreateUserService } from './register/create-user.service';
import { CreateCompanyService } from './register/create-company.service';
import { CreateUserAdminService } from './register/create-user-admin.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/domain/entity/user.entity';
import { Company } from 'src/domain/entity/company.entity';

@Module({
  imports: [SequelizeModule.forFeature([User,Company])],
  controllers: [],
  providers: [CreateUserService, CreateCompanyService, CreateUserAdminService],
  exports: [CreateUserService, CreateCompanyService, CreateUserAdminService]
})
export class AuthModule {}
