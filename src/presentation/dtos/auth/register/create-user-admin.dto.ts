import { CreateCompanyDto } from "./create-company.dto";
import { CreateUserDto } from "./create-user.dto";

export class CreateUserAdminDto {
    user: CreateUserDto;
    company: CreateCompanyDto;
}