import { Controller, Get, Post, Body, Request, HttpCode, Query, ParseIntPipe, DefaultValuePipe, Delete } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { ApiOkResponse } from '@nestjs/swagger';
import { ProjectDto } from 'src/modules/project/project.dto';
import { ProjectService } from 'src/modules/project/project.service';
import { Permissions } from 'src/common/constants/enum';
import { HasPermissions } from 'src/common/decorators/permisson.decorator';

@Controller('Project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get("Get")
  @HasPermissions(Permissions.Project, Permissions.Project_ViewDetail)
  async getProjectById(@Query('input', ParseIntPipe) id: number): Promise<object | null> {
    return await this.projectService.getProjectById(id);
  }

  @Get("getAll")
  @HasPermissions(Permissions.Project, Permissions.Project_View)
  async getAll(
    @Query('status', new ParseIntPipe({ optional: true })) status: number,
    @Query('search', new DefaultValuePipe("")) search: string,
  ): Promise<object | null> {
    return await this.projectService.getAll(status, search);
  }

  @Get("getQuantityProject")
  @HasPermissions(Permissions.Project, Permissions.Project_View)
  async getQuantityProject(): Promise<object | null> {
    return await this.projectService.getQuantityProject();
  }

  @Get("GetProjectPM")
  @HasPermissions(Permissions.Project, Permissions.Project_View)
  async getProjectPM(@Request() req: ExpressRequest): Promise<object | null> {
    return await this.projectService.getProjectPM(req['user'].id);
  }

  @Get("GetProjectsIncludingTasks")
  @HasPermissions(Permissions.Project, Permissions.Project_View)
  async getProjectsIncludingTasks(@Request() req: ExpressRequest): Promise<object | null> {
    return await this.projectService.getProjectsIncludingTasks(req['user'].id);
  }

  @Post("Save")
  @HasPermissions(Permissions.Project, [Permissions.Project_Edit, Permissions.Project_AddNew])
  @HttpCode(200)
  async saveProject(@Body() projectDto: ProjectDto): Promise<object | null> {
    return await this.projectService.saveProject(projectDto);
  }

  @Post("Active")
  @HasPermissions(Permissions.Project, Permissions.Project_ChangeStatus)
  @HttpCode(200)
  async activeProject(@Body('id', ParseIntPipe) id: number): Promise<object | null> {
    return await this.projectService.activeProject(id);
  }

  @Post("Inactive")
  @HasPermissions(Permissions.Project, Permissions.Project_ChangeStatus)
  @HttpCode(200)
  async inactiveProject(@Body('id', ParseIntPipe) id: number): Promise<object | null> {
    return await this.projectService.inactiveProject(id);
  }

  @Post("UpdateDefaultProjectTask")
  @HasPermissions(Permissions.Project, Permissions.Project_UpdateDefaultProjectTask)
  @HttpCode(200)
  @ApiOkResponse({ type: Boolean })
  async updateDefaultProjectTask(): Promise<boolean> {
    return true;
  }

  @Post("ClearDefaultProjectTask")
  @HasPermissions(Permissions.Project, Permissions.Project_UpdateDefaultProjectTask)
  @HttpCode(200)
  @ApiOkResponse({ type: Boolean })
  async clearDefaultProjectTask(): Promise<boolean> {
    return true;
  }

  @Delete("Delete")
  @HasPermissions(Permissions.Project, Permissions.Project_Delete)
  @HttpCode(200)
  async deleteProject(@Query('Id', ParseIntPipe) id: number): Promise<void> {
    return await this.projectService.deleteProject(id);
  }
}
