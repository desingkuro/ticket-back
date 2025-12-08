import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entity/user.entity';
import { CreateUserDto } from 'src/presentation/dtos/auth/register/create-user.dto';
import { AES } from 'crypto-js';
import { Transaction } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectModel(User) 
    private readonly userRepository: typeof User,
  ) { }

  async create(createUserDto: CreateUserDto, transaction?: Transaction): Promise<{ message: string, code: number }> {

    const { email, password, fullName, profile } = createUserDto;

    const secretKey = this.getSecretKey();
    const passwordBase64 = this.verifyPassword(password);
    const hashPassword = this.hashPassword(passwordBase64, secretKey);

    try {
      await this.existUser(email);
      await this.userRepository.create({
        email: email,
        password: hashPassword,
        fullName: fullName,
        profile: profile,
      }, { transaction })
      return {
        message: 'User created successfully',
        code: 201,
      };
    } catch (error) {
      console.log('create user', error);
      throw new HttpException({
        message: 'Error create user',
        code: 400,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  private getSecretKey() {
    const secretKey = process.env.SECRET_KEY_PASSWORD;

    if (!secretKey) {
      throw new HttpException(
        {
          status: 500,
          message:
            'La clave de cifrado (SECRET_KEY_PASSWORD) no está configurada en las variables de entorno.',
          error: 'Internal Server Error',
        },
        500,
      );
    }
    return secretKey;
  }

  private verifyPassword(password: string) {
    const passwordBase64 = Buffer.from(password, 'base64').toString('utf-8');
    if (!passwordBase64) {
      throw new HttpException(
        {
          status: 400,
          message: 'La contraseña debe ser una cadena codificada en base64.',
          error: 'Bad Request',
        },
        400,
      );
    }
    return passwordBase64;
  }

  private async existUser(email: string) {
    const existUser = await this.userRepository.findOne({ where: { email } });

    if (existUser) {
      throw new HttpException({
        message: 'User already exists',
        code: 400,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  private hashPassword(password: string, secretKey: string) {
    const hash = AES.encrypt(password, secretKey).toString();
    return hash;
  }
}

