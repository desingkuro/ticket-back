import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserAdminDto } from "src/presentation/dtos/auth/register/create-user-admin.dto";
import { CreateCompanyService } from "./create-company.service";
import { CreateUserService } from "./create-user.service";
import { InjectConnection } from "@nestjs/sequelize";
import { Sequelize } from "sequelize";
import { CreateUserRoleService } from "./create-user-rol.service";
import { CreateWorkerService } from "./create-worker.service";

@Injectable()
export class CreateUserAdminService {
    constructor(
        private readonly createUserService: CreateUserService,
        private readonly createCompanyService: CreateCompanyService,
        private readonly createUserRoleService: CreateUserRoleService,
        private readonly createWorkerService: CreateWorkerService,
        @InjectConnection() private readonly sequelize: Sequelize,
    ) { }
    
    async create(createUserAdminDto: CreateUserAdminDto): Promise<{ message: string, code: number }> {
        const { company, user, worker } = createUserAdminDto;
        return await this.sequelize.transaction(async (t) => {
            const companyCreated = await this.createCompanyService.create(company, t);
            const userCreated = await this.createUserService.create(user, t);
            await this.createUserRoleService.createUserRole(userCreated.id, 1, t);
            await this.createWorkerService.create(worker, userCreated.id, companyCreated.id, t);
        }).catch((error) => {
            console.log('Error create user admin', error);
            throw error;
        }).then(() => {
            return {
                message: 'User admin created successfully',
                code: 201,
            };
        });
    }
}