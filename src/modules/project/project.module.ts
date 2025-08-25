import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from 'src/modules/project/project.controller';
import { ProjectService } from 'src/modules/project/project.service';
import { 
  Project, User, Task, Client, ProjectUser, ProjectTask, ProjectTargetUser
} from 'src/common/database/entities';
import {
  UserRepository,
  TaskRepository,
  ClientRepository,
  ProjectRepository,
  ProjectUserRepository,
  ProjectTaskRepository,
  ProjectTargetUserRepository
} from 'src/common/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project, User, Task, Client, ProjectUser, ProjectTask, ProjectTargetUser
    ]),
  ],
  controllers: [ProjectController],
  providers: [
    UserRepository,
    TaskRepository,
    ClientRepository,
    ProjectService,
    ProjectRepository,
    ProjectUserRepository,
    ProjectTaskRepository,
    ProjectTargetUserRepository
  ],
})
export class ProjectModule {}
