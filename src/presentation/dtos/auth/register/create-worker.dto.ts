import { IsNumber, IsString } from "class-validator";

export class CreateWorkerDto {
    @IsNumber()
    id:number;

    @IsString()
    status:string;

    @IsString()
    profile:string;
}