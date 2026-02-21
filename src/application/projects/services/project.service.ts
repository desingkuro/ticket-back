import { HttpException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from 'src/domain/entity/project.entity';

@Injectable()
export class ProjectService {

  constructor(
    @InjectModel(Project)
    private readonly projectRepository: typeof Project
  ){}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    try {
      return await this.projectRepository.create({
        name: createProjectDto.name,
        customerId: createProjectDto.customerId,
        startDate: createProjectDto.startDate,
        endDate: createProjectDto.endDate,
        status: createProjectDto.status,
      } as any);
    } catch (error) {
      console.log('Error creating project', error);
      throw new HttpException({
        message: 'Error creating project',
        error: error?.message,
      }, 500);
    }
  }

  findAll() {
    return `This action returns all projects`;
  }

  findOne(id: number) {
    return `This action returns a #id project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #id project`;
  }

  remove(id: number) {
    return `This action removes a #id project`;
  }
}
