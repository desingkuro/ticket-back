import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ProjectStatus } from '../enums/project-status.enum';

export class CreateProjectDto {

    @IsInt()
    customerId: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;

    @IsEnum(ProjectStatus)
    status: ProjectStatus;
}