import { BadRequestException, Injectable } from '@nestjs/common';
import { RepositoryManager } from 'src/common/repositories';
import { plainToInstance } from 'class-transformer';
import {
  GetTimesheetStatisticDto,
  ResponseGetTimesheetStatisticTasksDto,
  ResponseGetTimesheetStatisticTeamsDto,
  ResponseExportBillableTimesheetsDto
} from './timesheet-project.dto';

@Injectable()
export class TimesheetProjectService {
  constructor(private readonly repositories: RepositoryManager) {}

  async getTimesheetStatisticTasks(req: GetTimesheetStatisticDto): Promise<ResponseGetTimesheetStatisticTasksDto[]> {
    const projectId = req.projectId;
    const startDate = new Date(req.startDate);
    const endDate = new Date(req.endDate);

    if (startDate > endDate) throw new BadRequestException('Start date must be before end date');

    const allProjectTasks = await this.repositories.projectTask.getProjectTasksByProjectId(projectId);
    const existingProjectTasks = await this.repositories.projectTask
      .getProjectTaskByProjectIdAndDateRange(projectId, startDate, endDate);
    const existingProjectTaskIds = existingProjectTasks.map(pt => pt.id);
    const missingProjectTasks = allProjectTasks.filter(pt => !existingProjectTaskIds.includes(pt.id));

    const response = [] as ResponseGetTimesheetStatisticTasksDto[];

    // Add existing project tasks with timesheet data
    existingProjectTasks.forEach(pt => {
      const totalWorkingTime = pt.timesheets
        .filter(ts => ts.status === 2 && ts.shadowTimesheets.length <= 0)
        .reduce((sum, ts) => sum + ts.workingTime, 0);
      
      const billableWorkingTime = pt.timesheets
        .filter(ts => ts.status === 2 && ts.shadowTimesheets.length <= 0 &&
          ((ts.typeOfWork === 0 && ts.billable) || (ts.typeOfWork === 1 && ts.isCharged))
        )
        .reduce((sum, ts) => sum + ts.workingTime, 0);
      
      response.push(plainToInstance(ResponseGetTimesheetStatisticTasksDto, {
        taskId: pt.task.id,
        taskName: pt.task.name,
        totalWorkingTime,
        billableWorkingTime,
        billable: true
      }));

      if(billableWorkingTime < totalWorkingTime) {
        response.push(plainToInstance(ResponseGetTimesheetStatisticTasksDto, {
          taskId: pt.task.id,
          taskName: pt.task.name,
          totalWorkingTime: totalWorkingTime - billableWorkingTime,
          billableWorkingTime: 0,
          billable: false
        }));
      }
    });

    // Add missing project tasks with zero timesheet data
    missingProjectTasks.forEach(pt => {
      response.push(plainToInstance(ResponseGetTimesheetStatisticTasksDto, {
        taskId: pt.task.id,
        taskName: pt.task.name,
        totalWorkingTime: 0,
        billableWorkingTime: 0,
        billable: true
      }));
    });

    // Sort response by totalWorkingTime descending
    response.sort((a, b) => b.totalWorkingTime - a.totalWorkingTime);
    return response;
  }

  async getTimesheetStatisticTeams(req: GetTimesheetStatisticDto): Promise<ResponseGetTimesheetStatisticTeamsDto[]> {
    const projectId = req.projectId;
    const startDate = new Date(req.startDate);
    const endDate = new Date(req.endDate);

    if (startDate > endDate) throw new BadRequestException('Start date must be before end date');

    const projectUsers = await this.repositories.projectUser.getProjectUsersByProjectId(projectId);
    const existingProjectTasks = await this.repositories.projectTask
      .getProjectTaskByProjectIdAndDateRange(projectId, startDate, endDate);

    const response = projectUsers.map(pu => plainToInstance(ResponseGetTimesheetStatisticTeamsDto, {
      userID: pu.user.id,
      userName: pu.user.name,
      projectUserType: pu.type,
      totalWorkingTime: 0,
      billableWorkingTime: 0
    }));

    // Add existing project tasks' users with timesheet data
    existingProjectTasks.forEach(pt => {
      pt.timesheets
        .filter(ts => ts.status === 2 && ts.shadowTimesheets.length <= 0)
        .forEach(ts => {
          const userStat = response.find(r => r.userID === ts.userId);
          if (userStat) {
            userStat.totalWorkingTime += ts.workingTime;

            if ((ts.typeOfWork === 0 && ts.billable) || (ts.typeOfWork === 1 && ts.isCharged)) {
              userStat.billableWorkingTime += ts.workingTime;
            }
          }
        });
    });

    // Sort response by totalWorkingTime descending
    response.sort((a, b) => b.totalWorkingTime - a.totalWorkingTime);
    return response;
  }

  async exportBillableTimesheets(req: GetTimesheetStatisticDto): Promise<ResponseExportBillableTimesheetsDto[]> {
    const projectId = req.projectId;
    const startDate = new Date(req.startDate);
    const endDate = new Date(req.endDate);

    if (startDate > endDate) throw new BadRequestException('Start date must be before end date');

    const projectTargetUsers = await this.repositories.projectTargetUser
      .getProjectTargetUsersByProjectId(projectId);
    const existingProjectTasks = await this.repositories.projectTask
      .getProjectTaskByProjectIdAndDateRange(projectId, startDate, endDate);
    
    const response = [] as ResponseExportBillableTimesheetsDto[];

    existingProjectTasks.forEach(pt => {
      pt.timesheets
        .filter(ts => ts.status === 2 && ts.shadowTimesheets.length <= 0)
        .forEach(ts => {
          if ((ts.typeOfWork === 0 && ts.billable) || (ts.typeOfWork === 1 && ts.isCharged)) {
            response.push(plainToInstance(ResponseExportBillableTimesheetsDto, {
              ...ts,
              userName: ts.user?.name,
              taskName: pt.task?.name,
              
              isShadow: ts.targetTimesheet ? true : false,
              
              roleName: ts.targetTimesheet ? projectTargetUsers
                .find(utu => utu.userId === ts.targetTimesheet.userId)?.roleName : '',

              targetUserName: ts.targetTimesheet ? projectTargetUsers
                .find(utu => utu.userId === ts.targetTimesheet.userId)?.user?.name
                  : projectTargetUsers[0]?.user?.name || '',
              targetUserWorkingTime: ts.targetTimesheet?.workingTime ?? 0,
            }, { excludeExtraneousValues: true }));
          }
        });
    });

    return response;
  }
}