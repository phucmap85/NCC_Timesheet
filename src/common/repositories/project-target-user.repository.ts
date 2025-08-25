import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { ProjectTargetUser } from 'src/common/database/entities';

@Injectable()
export class ProjectTargetUserRepository extends BaseRepository<ProjectTargetUser> {
  constructor(dataSource: DataSource) {
    super(dataSource, ProjectTargetUser);
  }

  async getProjectTargetUsersByProjectId(projectId: number): Promise<ProjectTargetUser[]> {
    return this.findAll({ where: { projectId: projectId } });
  }

  async saveProjectTargetUsers(projectTargetUsers: Partial<ProjectTargetUser>[]): Promise<ProjectTargetUser[]> {
    return await this.withTransaction(async (manager) => {
      const results: ProjectTargetUser[] = [];
      for (const projectTargetUser of projectTargetUsers) {
        const result = await this.saveWithTransaction(projectTargetUser, manager);
        results.push(result);
      }
      return results;
    });
  }

  async deleteByProjectId(projectId: number): Promise<void> {
    await this.withTransaction(async (manager) => {
      await manager.delete(ProjectTargetUser, { projectId: projectId });
    });
  }
}
