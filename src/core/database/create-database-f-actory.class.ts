import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { Logger } from "@nestjs/common";

@Injectable()
export class CreateDatabaseFactory {
    private readonly logger = new Logger(CreateDatabaseFactory.name);

    constructor(private configService: ConfigService) { }

    private createCloudConfig(uri: string): SequelizeModuleOptions {
        return {
            dialect: 'postgres',
            uri,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
            autoLoadModels: true,
            synchronize: false,
            logging: (sql: string) => this.logger.debug(sql),
        };
    }

    private createLocalConfig(): SequelizeModuleOptions {
        return {
            dialect: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT || 5432),
            username: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'admin123',
            database: process.env.DB_NAME || 'postgres',
            autoLoadModels: true,
            synchronize: true,
            logging: this.getLoggingOption(),
        };
    }

    createDatabase() {
        if (process.env.NODE_ENV === 'development') {
            return this.createLocalConfig();
        }
        return this.createCloudConfig(this.configService.get('DATABASE_URL') as string);
    }

    private getLoggingOption() {
        const env = this.configService.get('NODE_ENV', 'development');

        if (env === 'production') {
            return false;
        }

        return (sql: string) => {
            console.log('🔍 [Sequelize Query]:', sql);
        };
    }
}
