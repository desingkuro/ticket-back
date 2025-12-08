import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateDatabaseFActory } from './core/database/create-database-f-actory.class';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [DomainModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      envFilePath: ['.env', '.env.local', `.env.${process.env.NODE_ENV}`]
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const config = new CreateDatabaseFActory(configService)
        return config.createDatabase()
      },
      inject: [ConfigService]
    }),
    DomainModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: AuthInterceptor,
      useClass: AuthInterceptor
    },
    AppService],
})
export class AppModule { }
