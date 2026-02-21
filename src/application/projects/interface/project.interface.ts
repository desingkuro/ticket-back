import { ProjectStatus } from '../enums/project-status.enum';

export interface IProject {
    id: number;
    customerId: number;
    name: string;
    startDate: Date;
    endDate: Date;
    status: ProjectStatus;
    createdAt?: Date;
    updatedAt?: Date;
}