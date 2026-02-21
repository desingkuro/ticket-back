import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CreateDatabaseFactory } from './core/database/create-database-f-actory.class';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { DomainModule } from './domain/domain.module';
import { AuthModule } from './application/auth/auth.module';
import { CoreModule } from './core/core.module';
import { ProjectModule } from './application/projects/project.module';

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
        const config = new CreateDatabaseFactory(configService)
        return config.createDatabase()
      },
      inject: [ConfigService]
    }),
    DomainModule,
    AuthModule,
    CoreModule,
    ProjectModule
  ],
  controllers: [],
  providers: [
    {
      provide: AuthInterceptor,
      useClass: AuthInterceptor
    }
  ],
})
export class AppModule { }
