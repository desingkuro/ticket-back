import { CreateCompanyDto } from "./create-company.dto";
import { CreateUserDto } from "./create-user.dto";
import { CreateWorkerDto } from "./create-worker.dto";

export class CreateUserAdminDto {
    user: CreateUserDto;
    company: CreateCompanyDto;
    worker: CreateWorkerDto;
}