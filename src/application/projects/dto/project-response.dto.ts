import { ProjectStatus } from '../enums/project-status.enum';

export class ProjectResponseDto {
    id: number;
    customerId: number;
    name: string;
    startDate: Date;
    endDate: Date;
    status: ProjectStatus;
    createdAt: Date;
    updatedAt: Date;

    customer?: any;
    board?: any;
}