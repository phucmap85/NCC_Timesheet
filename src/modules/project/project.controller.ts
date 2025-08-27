import { Controller, Get, Post, Body, Request, HttpCode, Query, ParseIntPipe, DefaultValuePipe, Delete } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { ProjectDto } from 'src/modules/project/project.dto';
import { ProjectService } from 'src/modules/project/project.service';

@Controller('Project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get("Get")
  async getProjectById(@Query('input', ParseIntPipe) id: number): Promise<object | null> {
    return await this.projectService.getProjectById(id);
  }

  @Get("getAll")
  async getAll(
    @Query('status', new ParseIntPipe({ optional: true })) status: number,
    @Query('search', new DefaultValuePipe("")) search: string,
  ): Promise<object | null> {
    return await this.projectService.getAll(status, search);
  }

  @Get("getQuantityProject")
  async getQuantityProject(): Promise<object | null> {
    return await this.projectService.getQuantityProject();
  }

  @Get("GetProjectPM")
  async getProjectPM(@Request() req: ExpressRequest): Promise<object | null> {
    return await this.projectService.getProjectPM(req['user'].id);
  }

  @Get("GetProjectsIncludingTasks")
  async getProjectsIncludingTasks(@Request() req: ExpressRequest): Promise<object | null> {
    return await this.projectService.getProjectsIncludingTasks(req['user'].id);
  }

  @Post("Save")
  @HttpCode(200)
  async saveProject(@Body() projectDto: ProjectDto): Promise<object | null> {
    return await this.projectService.saveProject(projectDto);
  }

  @Post("Active")
  @HttpCode(200)
  async activeProject(@Body('id', ParseIntPipe) id: number): Promise<object | null> {
    return await this.projectService.activeProject(id);
  }

  @Post("Inactive")
  @HttpCode(200)
  async inactiveProject(@Body('id', ParseIntPipe) id: number): Promise<object | null> {
    return await this.projectService.inactiveProject(id);
  }

  @Delete("Delete")
  @HttpCode(200)
  async deleteProject(@Query('Id', ParseIntPipe) id: number): Promise<void> {
    return await this.projectService.deleteProject(id);
  }
}
