import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserRole } from "src/domain/entity/user-role.entity";
import { Transaction } from "sequelize";

@Injectable()
export class CreateUserRoleService {
    constructor(
        @InjectModel(UserRole)
        private readonly userRoleRepository: typeof UserRole,
    ) { }

    async createUserRole(userId: number, roleId: number, transaction?: Transaction): Promise<boolean> {
        try {
            await this.userRoleRepository.create({
                userId,
                roleId,
                assignedAt: new Date()
            }, { transaction })
            return true;
        } catch (error) {
            console.log('Error creating user role', error);
            throw new HttpException({
                message: 'Error creating user role',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}