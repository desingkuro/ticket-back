import { Module } from '@nestjs/common';
import { CreateUserService } from './register/create-user.service';
import { CreateCompanyService } from './register/create-company.service';
import { CreateUserAdminService } from './register/create-user-admin.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/domain/entity/user.entity';
import { Company } from 'src/domain/entity/company.entity';
import { UserRole } from 'src/domain/entity/user-role.entity';
import { Role } from 'src/domain/entity/role.entity';
import { LoginService } from './login/login.service';

@Module({
  imports: [SequelizeModule.forFeature([User,Company,UserRole,Role])],
  controllers: [],
  providers: [CreateUserService, CreateCompanyService, CreateUserAdminService,LoginService],
  exports: [CreateUserService, CreateCompanyService, CreateUserAdminService,LoginService]
})
export class AuthModule {}
