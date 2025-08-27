import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { Project } from 'src/common/database/entities';

@Injectable()
export class ProjectRepository extends BaseRepository<Project> {
  constructor(dataSource: DataSource) {
    super(dataSource, Project);
  }

  async getProjectById(id: number): Promise<Project | null> {
    return this.createQueryBuilder("project")
      .leftJoinAndSelect("project.customer", "customer")
      .leftJoinAndSelect("project.projectTasks", "projectTasks")
      .leftJoinAndSelect("project.projectUsers", "projectUsers")
      .leftJoinAndSelect("project.projectTargetUsers", "projectTargetUsers")
      .leftJoinAndSelect("projectUsers.user", "user")
      .where("project.id = :id", { id: id })
      .getOne();
  }

  async getAllProjects(): Promise<Project[]> {
    return this.createQueryBuilder("project")
      .leftJoinAndSelect("project.customer", "customer")
      .leftJoinAndSelect("project.projectTasks", "projectTasks")
      .leftJoinAndSelect("project.projectUsers", "projectUsers")
      .leftJoinAndSelect("project.projectTargetUsers", "projectTargetUsers")
      .leftJoinAndSelect("projectUsers.user", "user")
      .getMany();
  }

  async getProjectByName(name: string): Promise<Project | null> {
    return this.findOne({ where: { name: name } });
  }

  async getProjectByCode(code: string): Promise<Project | null> {
    return this.findOne({ where: { code: code } });
  }

  async getProjectCountByStatus(status: number): Promise<number> {
    return this.count({ where: { status: status } });
  }

  async getProjectsByUserId(userId: number): Promise<Project[]> {
    return this.createQueryBuilder("project")
      .leftJoinAndSelect("project.customer", "customer")
      .leftJoinAndSelect("project.projectUsers", "projectUsers")
      .leftJoinAndSelect("project.projectTasks", "projectTasks")
      .leftJoinAndSelect("project.projectTargetUsers", "projectTargetUsers")
      .leftJoinAndSelect("projectUsers.user", "user")
      .leftJoinAndSelect("projectTasks.task", "task")
      .leftJoinAndSelect("projectTargetUsers.user", "targetUser")
      .where("projectUsers.user.id = :userId", { userId: userId })
      .getMany();
  }

  async getProjectsByPMId(pmId: number): Promise<Project[]> {
    return this.createQueryBuilder("project")
      .leftJoinAndSelect("project.customer", "customer")
      .leftJoinAndSelect("project.projectUsers", "projectUsers")
      .leftJoinAndSelect("project.projectTasks", "projectTasks")
      .leftJoinAndSelect("project.projectTargetUsers", "projectTargetUsers")
      .leftJoinAndSelect("projectUsers.user", "user")
      .where("projectUsers.user.id = :pmId", { pmId: pmId })
      .andWhere("projectUsers.type = :type", { type: 1 })
      .getMany();
  }

  async saveProject(project: Partial<Project>): Promise<Project> {
    return await this.withTransaction(async (manager) => {
      return await this.saveWithTransaction(project, manager);
    });
  }

  async removeProject(project: Project): Promise<void> {
    await this.withTransaction(async (manager) => {
      return await this.removeWithTransaction(project, manager);
    });
  }

  async deleteProjectById(id: number): Promise<void> {
    await this.withTransaction(async (manager) => {
      await this.deleteWithTransaction({ id: id }, manager);
    });
  }
}
