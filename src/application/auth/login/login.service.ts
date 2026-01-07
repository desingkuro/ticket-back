import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { LoginDto } from "src/presentation/dtos/auth/login/login.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/domain/entity/user.entity";
import { UserRole } from "src/domain/entity/user-role.entity";
import { Role } from "src/domain/entity/role.entity";
import { AES } from "crypto-js";
import * as enc from "crypto-js/enc-utf8";
import * as jwt from "jsonwebtoken";

@Injectable()
export class LoginService {
    constructor(
        @InjectModel(User)
        private readonly userRepository: typeof User,
    ) { }

    async login(loginDto: LoginDto): Promise<{ message: string, code: number, token: string }> {
        const { email, password } = loginDto;
        try {
            const user = await this.existUser(email);
            console.log(user);
            const role = user?.userRole?.role
            // this.comprovatePassword(password, user.dataValues.password, process.env.SECRET_KEY_PASSWORD);
            //const token = this.generateToken({ id: user.id, role: role });
            return { message: 'Login successful', code: 200, token: 'token' };
        } catch (error) {
            console.log('Error login', error);
            throw error;
        }
    }

    private comprovatePassword(passWord: string, encryptedPassword: string, secretKey: string) {
        const secretKeyBackup = process.env.SECRET_KEY_PASSWORD;
        const decryptedPasswordBackup = AES.decrypt(encryptedPassword, secretKeyBackup).toString(enc.Utf8);
        console.log('decryptedPasswordBackup', decryptedPasswordBackup);
        console.log('passWord', passWord);
        if (passWord !== decryptedPasswordBackup) {
            throw new HttpException
                ({
                    message: 'Invalid password',
                    code: 401,
                }, HttpStatus.UNAUTHORIZED);
        }
    }

    private generateToken(data: { id: number; role: Role }): string {
        const secretKey = process.env.SECRET_KEY_TOKEN;
        const expiresInEnv = process.env.JWT_EXPIRATION_TIME;
        const expiresIn: jwt.SignOptions['expiresIn'] =
            expiresInEnv && /^\d+$/.test(expiresInEnv)
                ? Number(expiresInEnv)
                : (expiresInEnv as unknown as jwt.SignOptions['expiresIn']) ?? '1h';

        if (!secretKey || typeof secretKey !== 'string' || secretKey.trim() === '') {
            throw new Error('SECRET_KEY_TOKEN is not defined in environment variables');
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
            where: { email },
            include: [
                {
                    model: UserRole,
                    include: [{ model: Role }]
                }
            ]
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
}