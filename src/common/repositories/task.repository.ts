import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { Task } from 'src/common/database/entities';

@Injectable()
export class TaskRepository extends BaseRepository<Task> {
  constructor(dataSource: DataSource) {
    super(dataSource, Task);
  }

  async getTaskById(id: number): Promise<Task | null> {
    return this.findOne({ where: { id: id } });
  }

  async getTaskByName(name: string): Promise<Task | null> {
    return this.findOne({ where: { name: name } });
  }

  async saveTask(task: Partial<Task>): Promise<Task> {
    return await this.withTransaction(async (manager) => {
      return await this.saveWithTransaction(task, manager);
    });
  }

  async removeTask(task: Task): Promise<void> {
    await this.withTransaction(async (manager) => {
      return await this.removeWithTransaction(task, manager);
    });
  }
}