import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { ProjectUser } from 'src/common/database/entities';

@Injectable()
export class ProjectUserRepository extends BaseRepository<ProjectUser> {
  constructor(dataSource: DataSource) {
    super(dataSource, ProjectUser);
  }

  async getProjectUsersByProjectId(projectId: number): Promise<ProjectUser[]> {
    return this.findAll({ where: { projectId: projectId } });
  }

  async saveProjectUsers(projectUsers: Partial<ProjectUser>[]): Promise<ProjectUser[]> {
    return await this.withTransaction(async (manager) => {
      const results: ProjectUser[] = [];
      for (const projectUser of projectUsers) {
        const result = await this.saveWithTransaction(projectUser, manager);
        results.push(result);
      }
      return results;
    });
  }

  async deleteByProjectId(projectId: number): Promise<void> {
    await this.withTransaction(async (manager) => {
      await manager.delete(ProjectUser, { projectId: projectId });
    });
  }
}
