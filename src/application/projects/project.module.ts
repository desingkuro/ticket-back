import { Module } from '@nestjs/common';
import { ProjectService } from './services/project.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from 'src/domain/entity/project.entity';
import { ProjectController } from 'src/presentation/controllers/project/project.controller';

@Module({
  imports: [SequelizeModule.forFeature([Project])],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService]
})
export class ProjectModule {}
