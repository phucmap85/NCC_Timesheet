import { Controller, Get, Post, Body, Delete, Query } from '@nestjs/common';
import { TaskDto } from 'src/modules/task/task.dto';
import { TaskService } from './task.service';

@Controller('Task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get("GetAll")
  async getAll(): Promise<object | null> {    
    return this.taskService.getAllPagging([], "", 0, 1e18);
  }

  @Post("Save")
  async createTask(@Body() taskDto: TaskDto): Promise<object | null> {
    const { id = 0, name, type, isDeleted = false } = taskDto;

    return this.taskService.createOrEditTask(id, name, type, isDeleted);
  }

  @Delete("Archive")
  async archiveTask(@Query("Id") id: number) {
    return this.taskService.changeDeleteStatus(id);
  }

  @Post("DeArchive")
  async deArchiveTask(@Body() body: object) {
    return this.taskService.changeDeleteStatus(body['id']);
  }

  @Delete("Delete")
  async deleteTask(@Query("Id") id: number) {
    return this.taskService.deleteTask(id);
  }
}
