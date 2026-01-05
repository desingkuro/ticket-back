import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/domain/entity/user.entity';
import { Role } from 'src/domain/entity/role.entity';
import { UserRole } from 'src/domain/entity/user-role.entity';
import { UserRepository, UserWithRole } from 'src/domain/repositories/user.repository';

@Injectable()
export class UserRepositorySequelize implements UserRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findByEmailWithRole(email: string): Promise<UserWithRole | null> {
    const user: any = await this.userModel.findOne({
      where: { email },
      include: [
        {
          model: UserRole,
          include: [{ model: Role }],
        },
      ],
    });

    if (!user) return null;

    const role = user?.userRole?.role
      ? { id: user.userRole.role.id, name: user.userRole.role.name }
      : null;

    return {
      id: user.id,
      email: user.email,
      password: user.password ?? user.dataValues?.password,
      role,
    };
  }
}
