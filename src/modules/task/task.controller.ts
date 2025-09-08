import { Controller, Get, Post, Body, Delete, Query, HttpCode, ParseIntPipe, BadGatewayException } from '@nestjs/common';
import { TaskDto } from 'src/modules/task/task.dto';
import { TaskService } from 'src/modules/task/task.service';
import { Permissions } from 'src/common/constants/enum';
import { HasPermissions } from 'src/common/decorators/permisson.decorator';

@Controller('Task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get("GetAll")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Tasks, Permissions.Admin_Tasks_View)
  async getAll(): Promise<object | null> {    
    return this.taskService.getAllPagging([], "", 0, 1e18);
  }

  @Post("Save")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Tasks, [Permissions.Admin_Tasks_Edit, Permissions.Admin_Tasks_AddNew])
  @HttpCode(200)
  async createTask(@Body() taskDto: TaskDto): Promise<object | null> {
    const { id = 0, name, type, isDeleted = false } = taskDto;

    return this.taskService.createOrEditTask(id, name, type, isDeleted);
  }

  @Delete("Archive")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Tasks, Permissions.Admin_Tasks_ChangeStatus)
  @HttpCode(200)
  async archiveTask(@Query("Id", ParseIntPipe) id: number): Promise<void> {
    return this.taskService.archiveTask(id);
  }

  @Post("DeArchive")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Tasks, Permissions.Admin_Tasks_ChangeStatus)
  @HttpCode(200)
  async deArchiveTask(@Body() body: object): Promise<void> {
    if (!body['id']) throw new BadGatewayException('Id is required');
    if (typeof body['id'] !== 'number' || isNaN(body['id']) || body['id'] < 1) {
      throw new BadGatewayException('Id must be a positive integer');
    }
    return this.taskService.deArchiveTask(body['id']);
  }

  @Delete("Delete")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Tasks, Permissions.Admin_Tasks_Delete)
  @HttpCode(200)
  async deleteTask(@Query("Id", ParseIntPipe) id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
