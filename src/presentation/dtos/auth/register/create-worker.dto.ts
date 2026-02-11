import { IsBoolean, IsString } from "class-validator";

export class CreateWorkerDto {

    @IsBoolean()
    status:boolean;

    @IsString()
    position:string;
}
