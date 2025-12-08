import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserAdminDto } from "src/presentation/dtos/auth/register/create-user-admin.dto";
import { CreateCompanyService } from "./create-company.service";
import { CreateUserService } from "./create-user.service";
import { InjectConnection } from "@nestjs/sequelize";
import { Sequelize } from "sequelize";

@Injectable()
export class CreateUserAdminService {
    constructor(
        private readonly createUserService: CreateUserService,
        private readonly createCompanyService: CreateCompanyService,
        @InjectConnection() private readonly sequelize: Sequelize,
    ) { }
    
    async create(createUserAdminDto: CreateUserAdminDto): Promise<{ message: string, code: number }> {
        const { user, company } = createUserAdminDto;
        await this.sequelize.transaction(async (t) => {
            await this.createCompanyService.create(company, t);
            await this.createUserService.create(user, t);
        }).catch((error) => {
            console.log('Error create user admin', error);
            throw new HttpException({
                message: 'Error create user admin',
                code: 400,
            }, HttpStatus.BAD_REQUEST);
        });
        return {
            message: 'User admin created successfully',
            code: 201,
        };
    }
}