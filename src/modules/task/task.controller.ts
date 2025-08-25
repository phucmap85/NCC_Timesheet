import { Controller, Get, Post, Body, Delete, Query, HttpCode, ParseIntPipe } from '@nestjs/common';
import { TaskDto } from 'src/modules/task/task.dto';
import { TaskService } from 'src/modules/task/task.service';

@Controller('Task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get("GetAll")
  async getAll(): Promise<object | null> {    
    return this.taskService.getAllPagging([], "", 0, 1e18);
  }

  @Post("Save")
  @HttpCode(200)
  async createTask(@Body() taskDto: TaskDto): Promise<object | null> {
    const { id = 0, name, type, isDeleted = false } = taskDto;

    return this.taskService.createOrEditTask(id, name, type, isDeleted);
  }

  @Delete("Archive")
  @HttpCode(200)
  async archiveTask(@Query("Id", ParseIntPipe) id: number): Promise<void> {
    return this.taskService.changeDeleteStatus(id);
  }

  @Post("DeArchive")
  @HttpCode(200)
  async deArchiveTask(@Body() body: object): Promise<void> {
    return this.taskService.changeDeleteStatus(body['id']);
  }

  @Delete("Delete")
  @HttpCode(200)
  async deleteTask(@Query("Id", ParseIntPipe) id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
