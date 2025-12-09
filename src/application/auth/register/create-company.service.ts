import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Transaction } from "sequelize";
import { Company } from "src/domain/entity/company.entity";
import { CreateCompanyDto } from "src/presentation/dtos/auth/register/create-company.dto";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class CreateCompanyService {
    constructor(
        @InjectModel(Company)
        private readonly companyRepository: typeof Company,
    ) { }

    async create(createCompanyDto: CreateCompanyDto, transaction?: Transaction): Promise<{ message: string, code: number }> {
        const { name, nit, address, phone, email } = createCompanyDto;
        await this.existCompany(nit);
        try {
            await this.companyRepository.create({
                name,
                nit,
                address,
                phone,
                email,
            }, { transaction })
            return {
                message: 'Company created successfully',
                code: 201
            }
        } catch (error) {
            console.log('create company', error);
            throw new HttpException({
                message: 'Error create company',
                code: 400
            }, HttpStatus.BAD_REQUEST)
        }
    }

    private async existCompany(nit: string) {
        const existCompany = await this.companyRepository.findOne({ where: { nit } });
        if (existCompany) {
            throw new HttpException({
                message: 'Company already exists',
                code: 400
            }, HttpStatus.BAD_REQUEST)
        }
    }
}