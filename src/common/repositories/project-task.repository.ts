import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { ProjectTask } from 'src/common/database/entities';

@Injectable()
export class ProjectTaskRepository extends BaseRepository<ProjectTask> {
  constructor(dataSource: DataSource) {
    super(dataSource, ProjectTask);
  }

  async getProjectTasksByProjectId(projectId: number): Promise<ProjectTask[]> {
    return this.findAll({ where: { projectId: projectId } });
  }

  async saveProjectTasks(projectTasks: Partial<ProjectTask>[]): Promise<ProjectTask[]> {
    return await this.withTransaction(async (manager) => {
      const results: ProjectTask[] = [];
      for (const projectTask of projectTasks) {
        const result = await this.saveWithTransaction(projectTask, manager);
        results.push(result);
      }
      return results;
    });
  }

  async deleteByProjectId(projectId: number): Promise<void> {
    await this.withTransaction(async (manager) => {
      await manager.delete(ProjectTask, { projectId: projectId });
    });
  }
}
