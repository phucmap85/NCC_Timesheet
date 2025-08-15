import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/entities';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class TaskService extends BaseService<Task> {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {
    super(taskRepository, 'task');
  }

  async getAllPagging(
    filterItems: any[], 
    searchText: string, 
    skipCount: number, 
    maxResultCount: number
  ): Promise<object | null> {
    const res = await super.getAllPaging(filterItems, searchText, skipCount, maxResultCount, ["name"], "id", "ASC");

    return (res ? res['items'] : null);
  }

  async createOrEditTask(
    id: number, name: string, type: number, isDeleted: boolean
  ): Promise<object | null> {
    try {
      // Create new task
      if(id === 0) {
        const existingName = await this.taskRepository.findOne({ where: { name: name } });
        if (existingName) {
          throw new Error(`Task with name ${name} already exists`);
        }
        
        const newTask = this.taskRepository.create({ name: name, type: type, isDeleted: isDeleted });
        await this.taskRepository.save(newTask);
        return newTask;
      }

      // Update existing task
      let task = await this.taskRepository.findOne({ where: { id: id } });
      if (!task) throw new Error("Task not found");
      
      if(name !== task.name) {
        const existingName = await this.taskRepository.findOne({ where: { name: name } });
        if (existingName && existingName.id !== id) {
          throw new Error(`Task with name ${name} already exists`);
        }
      }

      task.name = name;
      task.type = type;
      task.isDeleted = isDeleted;
      await this.taskRepository.save(task);
      
      return task;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async changeDeleteStatus(id: number): Promise<void> {
    try {
      const task = await this.taskRepository.findOne({ where: { id: id } });
      if (!task) throw new Error(`Task not found`);

      if(task.isDeleted) {
        try {
          task.isDeleted = false;

          await this.taskRepository.save(task);
        } catch (error) {
          throw new Error(`Error restoring task ID ${id}`);
        }
      } else {
        try {
          let temp = { ...task };

          await this.taskRepository.remove(task);

          temp.isDeleted = true;

          await this.taskRepository.save(temp);
        } catch (error) {
          throw new Error(`This task ID ${id} is in a project, cannot be archived`);
        }
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteTask(id: number) {
    try {
      const task = await this.taskRepository.findOne({ where: { id: id } });
      if (!task) throw new Error(`Task not found`);

      try {
        await this.taskRepository.remove(task);
      } catch (error) {
        throw new Error(`Task ID ${id} is being used, cannot be deleted`);
      }      
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
