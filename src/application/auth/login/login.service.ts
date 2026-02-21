import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { LoginDto } from "src/presentation/dtos/auth/login/login.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/domain/entity/user.entity";
import { UserRole } from "src/domain/entity/user-role.entity";
import { Role } from "src/domain/entity/role.entity";
import * as CryptoJS from "crypto-js";
import * as jwt from "jsonwebtoken";

@Injectable()
export class LoginService {
    constructor(
        @InjectModel(User)
        private readonly userRepository: typeof User,
        @InjectModel(UserRole)
        private readonly userRoleRepository: typeof UserRole,
    ) { }

    private secretKeyBackup = process.env.SECRET_KEY_PASSWORD;

    async login(loginDto: LoginDto): Promise<{ message: string, code: number, token: string }> {
        const { email, password } = loginDto;
        try {
            const user: User = await this.existUser(email);
            const role: Role = await this.getRole(user);
            this.comprovatePassword(password, user.dataValues.password);
            const token = this.generateToken({ id: user.id, role: role });
            return { message: 'Login successful', code: 200, token: token };
        } catch (error) {
            console.log('Error login', error);
            throw error;
        }
    }

    private comprovatePassword(passWord: string, encryptedPassword: string) {
        const bytes = CryptoJS.AES.decrypt(encryptedPassword, this.secretKeyBackup);
        const decryptedPasswordBackup = bytes.toString(CryptoJS.enc.Utf8);

        const passWordDecode = atob(passWord);

        if (passWordDecode !== decryptedPasswordBackup) {
            throw new HttpException(
                {
                    message: 'Invalid password',
                    code: 401,
                },
                HttpStatus.UNAUTHORIZED
            );
        }
    }

    private generateToken(data: { id: number; role: Role }): string {
        const secretKey = process.env.JWT_SECRET_KEY;
        const expiresInEnv = process.env.JWT_EXPIRATION_TIME;
        const expiresIn: jwt.SignOptions['expiresIn'] =
            expiresInEnv && /^\d+$/.test(expiresInEnv)
                ? Number(expiresInEnv)
                : (expiresInEnv as unknown as jwt.SignOptions['expiresIn']) ?? '1h';

        if (!secretKey || typeof secretKey !== 'string' || secretKey.trim() === '') {
            throw new Error('JWT_SECRET_KEY is not defined in environment variables');
        }

        if (!data.id || !data.role) {
            throw new Error('Token payload missing required fields');
        }

        const payload = {
            id: data.id,
            role: {
                id: data.role.id,
                name: data.role.name
            }
        };

        return jwt.sign(payload, secretKey, { expiresIn });
    }

    private async existUser(email: string): Promise<User> {
        const user: User | null = await this.userRepository.findOne({
            where: { email }
        });
        if (!user) {
            throw new HttpException
                ({
                    message: 'User not found',
                    code: 404,
                }, HttpStatus.NOT_FOUND);
        }
        return user;
    }

    private async getRole(user: User): Promise<Role> {
        const userRole: UserRole | null = await this.userRoleRepository.findOne({
            where: { userId: user.id },
            include: [{
                model: Role,
                as: 'role',
            }]
        });
        if (!userRole) {
            throw new HttpException
                ({
                    message: 'User role not found',
                    code: 404,
                }, HttpStatus.NOT_FOUND);
        }
        return userRole.dataValues.role;
    }
}