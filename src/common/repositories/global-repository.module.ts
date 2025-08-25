import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  UserRole,
  ProjectUser,
  Branch,
  Position,
  Role,
  Project,
  Task,
  Client,
  ProjectTask,
  ProjectTargetUser,
  RolePermission,
  Timesheet
} from 'src/common/database/entities';
import {
  UserRepository,
  UserRoleRepository,
  ProjectUserRepository,
  BranchRepository,
  PositionRepository,
  RoleRepository,
  ProjectRepository,
  TaskRepository,
  ClientRepository,
  ProjectTaskRepository,
  ProjectTargetUserRepository,
  RolePermissionRepository,
  TimesheetRepository,
  RepositoryManager
} from 'src/common/repositories';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserRole,
      ProjectUser,
      Branch,
      Position,
      Role,
      Project,
      Task,
      Client,
      ProjectTask,
      ProjectTargetUser,
      RolePermission,
      Timesheet
    ])
  ],
  providers: [
    UserRepository,
    UserRoleRepository,
    ProjectUserRepository,
    BranchRepository,
    PositionRepository,
    RoleRepository,
    ProjectRepository,
    TaskRepository,
    ClientRepository,
    ProjectTaskRepository,
    ProjectTargetUserRepository,
    RolePermissionRepository,
    TimesheetRepository,
    RepositoryManager
  ],
  exports: [
    UserRepository,
    UserRoleRepository,
    ProjectUserRepository,
    BranchRepository,
    PositionRepository,
    RoleRepository,
    ProjectRepository,
    TaskRepository,
    ClientRepository,
    ProjectTaskRepository,
    ProjectTargetUserRepository,
    RolePermissionRepository,
    TimesheetRepository,
    RepositoryManager
  ]
})
export class GlobalRepositoryModule {}
