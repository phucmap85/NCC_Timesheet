import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { ProjectTask } from 'src/common/database/entities';

@Injectable()
export class ProjectTaskRepository extends BaseRepository<ProjectTask> {
  constructor(dataSource: DataSource) {
    super(dataSource, ProjectTask);
  }

  commonQuery() {
    return this.createQueryBuilder('projectTask')
      .leftJoinAndSelect('projectTask.project', 'project')
      .leftJoinAndSelect('projectTask.task', 'task')
      .leftJoinAndSelect('projectTask.timesheets', 'timesheets')
      .leftJoinAndSelect('timesheets.targetTimesheet', 'targetTimesheet')
      .leftJoinAndSelect('timesheets.shadowTimesheets', 'shadowTimesheets')
      .leftJoinAndSelect('timesheets.user', 'user');
  }

  async getProjectTaskByProjectIdAndDateRange(
    projectId: number,
    startDate: Date,
    endDate: Date
  ): Promise<ProjectTask[]> {
    return this.commonQuery()
      .where('projectTask.projectId = :projectId', { projectId })
      .andWhere('timesheets.dateAt BETWEEN :startDate AND :endDate', { startDate: startDate, endDate: endDate })
      .getMany();
  }

  async getProjectTasksByProjectId(projectId: number): Promise<ProjectTask[]> {
    return this.commonQuery().where('projectTask.projectId = :projectId', { projectId }).getMany();
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

  async deleteByProjectTaskIds(projectTaskIds: number[]): Promise<void> {
    await this.withTransaction(async (manager) => {
      await manager.delete(ProjectTask, { id: In(projectTaskIds) });
    });
  }
}
