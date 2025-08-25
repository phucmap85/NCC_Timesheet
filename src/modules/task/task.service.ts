import { Injectable, BadRequestException } from '@nestjs/common';
import { Task } from 'src/common/database/entities';
import { RepositoryManager } from 'src/common/repositories';

@Injectable()
export class TaskService {
  constructor(private readonly repositories: RepositoryManager) {}

  async getAllPagging(
    filterItems: any[], 
    searchText: string, 
    skipCount: number, 
    maxResultCount: number
  ): Promise<object | null> {
    const res = await this.repositories.task.getAllPaging(
      filterItems, searchText, skipCount, maxResultCount,
      ["name"],
      "id", "ASC"
    );

    return (res ? res['items'] : null);
  }

  async createOrEditTask(
    id: number, name: string, type: number, isDeleted: boolean
  ): Promise<object | null> {
    try {
      // Create new task
      if(id === 0) {
        const existingName = await this.repositories.task.getTaskByName(name);
        if (existingName) {
          throw new Error(`Task with name ${name} already exists`);
        }
        
        const newTask = { name: name, type: type, isDeleted: isDeleted } as Task;
        return await this.repositories.task.saveTask(newTask);
      }

      // Update existing task
      let task = await this.repositories.task.getTaskById(id);
      if (!task) throw new Error("Task not found");
      
      if(name !== task.name) {
        const existingName = await this.repositories.task.getTaskByName(name);
        if (existingName && existingName.id !== id) {
          throw new Error(`Task with name ${name} already exists`);
        }
      }

      task.name = name;
      task.type = type;
      task.isDeleted = isDeleted;
      
      return await this.repositories.task.saveTask(task);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async changeDeleteStatus(id: number): Promise<void> {
    try {
      const task = await this.repositories.task.getTaskById(id);
      if (!task) throw new Error(`Task not found`);

      if(task.isDeleted) {
        try {
          task.isDeleted = false;

          await this.repositories.task.saveTask(task);
        } catch (error) {
          throw new Error(`Error restoring task ID ${id}`);
        }
      } else {
        try {
          let temp = { ...task };

          await this.repositories.task.removeTask(task);

          temp.isDeleted = true;

          await this.repositories.task.saveTask(temp);
        } catch (error) {
          throw new Error(`This task ID ${id} is in a project, cannot be archived`);
        }
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteTask(id: number): Promise<void> {
    try {
      const task = await this.repositories.task.getTaskById(id);
      if (!task) throw new Error(`Task not found`);

      try {
        return await this.repositories.task.removeTask(task);
      } catch (error) {
        throw new Error(`Task ID ${id} is being used, cannot be deleted`);
      }      
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
