import { IsNumber, IsString } from "class-validator";

export class CreateWorkerDto {

    @IsString()
    status:string;

    @IsString()
    position:string;
}
