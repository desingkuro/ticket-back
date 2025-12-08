import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SequelizeModuleOptions } from "@nestjs/sequelize";

@Injectable()
export class CreateDatabaseFActory {
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
            logging: this.getLoggingOption(),
        };
    }

    private createLocalConfig(): SequelizeModuleOptions {
        return {
            dialect: 'postgres',
            host: this.configService.get('DB_HOST', 'localhost'),
            port: this.configService.get<number>('DB_PORT', 5432),
            username: this.configService.get('DB_USER', 'postgres'),
            password: this.configService.get('DB_PASSWORD', 'admin123'),
            database: this.configService.get('DB_NAME', 'postgres'),
            autoLoadModels: true,
            synchronize: false,
            logging: this.getLoggingOption(),
        };
    }

    private getLoggingOption() {
        const env = this.configService.get('NODE_ENV', 'development');

        // En producción
        if (env === 'production') {
            return false;
        }

        // En desarrollo
        return (sql: string) => {
            console.log('🔍 [Sequelize Query]:', sql);
        };
    }

    createDatabase() {
        if (this.configService.get('NODE_ENV') === 'development') {
            return this.createLocalConfig();
        }
        return this.createCloudConfig(this.configService.get('DATABASE_URL') as string);
    }
}
