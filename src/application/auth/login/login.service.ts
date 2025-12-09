import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/domain/entity/user.entity";
import { LoginDto } from "src/presentation/dtos/auth/login/login.dto";
import * as Crypto from 'crypto-js';
import * as jwt from 'jsonwebtoken';
import { UserRole } from "src/domain/entity/user-role.entity";
import { Role } from "src/domain/entity/role.entity";
import { TokenPayload } from "src/shared/interface/login.interface";

@Injectable()
export class LoginService {
    constructor(
        @InjectModel(User)
        private readonly userRepository: typeof User,
    ) { }

    async login(loginDto: LoginDto, secretKey: string): Promise<{ message: string, code: number, token: string }> {
        const { email, password } = loginDto;
        try {
            const user: any = await this.userRepository.findOne(
                {
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
            const role = user?.userRole?.role
            this.comprovatePassword(password, user.password, secretKey);

            const token = this.generateToken({ id: user.id, role: role });
            return { message: 'Login successful', code: 200, token };
        } catch (error) {
            console.log('Error login', error);
            throw new HttpException
                ({
                    message: 'Error login',
                    code: 400,
                }, HttpStatus.BAD_REQUEST);
        }
    }

    private comprovatePassword(passWord: string, encryptedPassword: string, secretKey: string) {
        const secretKeyBackup = process.env.SECRET_KEY_PASSWORD;
        const decryptedPasswordBackup = Crypto.AES.decrypt(encryptedPassword, secretKeyBackup).toString(Crypto.enc.Utf8);
        const decryptedPassword = Crypto.AES.decrypt(passWord, secretKey).toString(Crypto.enc.Utf8);
        if (decryptedPassword !== decryptedPasswordBackup) {
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

        const payload: TokenPayload = {
            id: data.id,
            role: {
                id: data.role.id,
                name: data.role.name
            }
        };

        return jwt.sign(payload, secretKey, { expiresIn });
    }
}