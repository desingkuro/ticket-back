import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entity/user.entity';
import { Sidebar } from './entity/sidebar.entity';
import { ModuleEntity } from './entity/module.entity';
import { ActivityLog } from './entity/activity-log.entity';
import { Role } from './entity/role.entity';
import { Board } from './entity/board.entity';
import { Card } from './entity/card.entity';
import { CardWorker } from './entity/card-worker.entity';
import { Worker } from './entity/worker.entity';
import { TeamWorker } from './entity/team-worker.entity';
import { Team } from './entity/team.entity';
import { Project } from './entity/project.entity';
import { ProjectTeam } from './entity/project-team.entity';
import { Comment } from './entity/comment.entity';
import { Company } from './entity/company.entity';
import { Customer } from './entity/customer.entity';
import { UserRole } from './entity/user-role.entity';

@Module({
  imports: [SequelizeModule.forFeature([
    User,
    Sidebar,
    ModuleEntity,
    Role,
    ActivityLog,
    Board,
    Card,
    CardWorker,
    Worker,
    TeamWorker,
    Team,
    Project,
    ProjectTeam,
    Comment,
    Company,
    Customer,
    UserRole
])],
  controllers: [],
  providers: [],
  exports: []
})
export class DomainModule {}
