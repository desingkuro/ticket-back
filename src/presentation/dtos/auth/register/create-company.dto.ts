import { IsEmail, IsString } from "class-validator";

export class CreateCompanyDto {
    @IsString()
    name: string;

    @IsString()
    nit: string;

    @IsString()
    phone: string;

    @IsString()
    @IsEmail()
    email: string;
}