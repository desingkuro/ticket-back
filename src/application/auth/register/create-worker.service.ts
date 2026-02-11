import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Transaction } from "sequelize";
import { CreateWorkerDto } from "src/presentation/dtos/auth/register/create-worker.dto";
import { Worker } from "src/domain/entity/worker.entity";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class CreateWorkerService {
    constructor(
        @InjectModel(Worker)
        private readonly workerRepository: typeof Worker,
    ) { }

    async create(createWorkerDto: CreateWorkerDto, userId: number, companyId: number, transaction: Transaction) {
        const { status, position } = createWorkerDto;
        try {
            const worker: Worker = await this.workerRepository.create({
                userId,
                companyId,
                status,
                position
            }, { transaction });
            return worker;
        } catch (error) {
            console.log('Error create worker', error);
            throw new HttpException({
                message: 'Error creating worker',
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}