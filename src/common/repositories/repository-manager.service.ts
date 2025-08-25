import { Injectable } from '@nestjs/common';
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
  TimesheetRepository
} from './index';

@Injectable()
export class RepositoryManager {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly userRoleRepo: UserRoleRepository,
    private readonly projectUserRepo: ProjectUserRepository,
    private readonly branchRepo: BranchRepository,
    private readonly positionRepo: PositionRepository,
    private readonly roleRepo: RoleRepository,
    private readonly projectRepo: ProjectRepository,
    private readonly taskRepo: TaskRepository,
    private readonly clientRepo: ClientRepository,
    private readonly projectTaskRepo: ProjectTaskRepository,
    private readonly projectTargetUserRepo: ProjectTargetUserRepository,
    private readonly rolePermissionRepo: RolePermissionRepository,
    private readonly timesheetRepo: TimesheetRepository
  ) {}

  get user() { return this.userRepo; }
  get userRole() { return this.userRoleRepo; }
  get projectUser() { return this.projectUserRepo; }
  get branch() { return this.branchRepo; }
  get position() { return this.positionRepo; }
  get role() { return this.roleRepo; }
  get project() { return this.projectRepo; }
  get task() { return this.taskRepo; }
  get client() { return this.clientRepo; }
  get projectTask() { return this.projectTaskRepo; }
  get projectTargetUser() { return this.projectTargetUserRepo; }
  get rolePermission() { return this.rolePermissionRepo; }
  get timesheet() { return this.timesheetRepo; }
}
