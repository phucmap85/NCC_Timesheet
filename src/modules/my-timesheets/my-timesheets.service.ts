import { BadRequestException, Injectable } from '@nestjs/common';
import { RepositoryManager } from 'src/common/repositories';
import { 
  WarningMyTimesheetDto,
  GetAllTimeSheetOfUserDto,
  CreateMyTimesheetDto,
  UpdateMyTimesheetDto,
  TimesheetDto,
  saveListDto,
} from './my-timesheets.dto';
import { Timesheet } from 'src/common/database/entities';
import { plainToInstance } from 'class-transformer';
import { startOfWeek } from 'date-fns';
import { convertTimeStringToMinutes } from 'src/common/utils/converters/time-string.converter';

@Injectable()
export class MyTimesheetsService {
  constructor(private readonly repositories: RepositoryManager) {}

  async getAllTimeSheetOfUser(
    userId: number,
    startDate: Date,
    endDate: Date
  ): Promise<GetAllTimeSheetOfUserDto[] | null> {
    // Validate startDate and endDate
    if (startDate > endDate) throw new BadRequestException('startDate must be less than or equal to endDate');

    // Get timesheets by userId and date range
    const timesheets = await this.repositories.timesheet.findByUserIdAndDateRange(userId, startDate, endDate);
    
    // Filter out timesheets where they have shadowTimesheets
    const filteredTimesheets = timesheets.filter(timesheet => timesheet.shadowTimesheets.length === 0);

    // For each timesheet, get project name, project code, task name, customer name
    return await Promise.all(filteredTimesheets.map(async (timesheet) => {
      const projectDetail = await this.repositories.project.getProjectById(timesheet.projectTask.projectId) as any;
      if (!projectDetail) throw new BadRequestException(`Project with ID ${timesheet.projectTask.projectId} not found`);
      
      const taskDetail = await this.repositories.task.getTaskById(timesheet.projectTask.taskId) as any;
      if (!taskDetail) throw new BadRequestException(`Task with ID ${timesheet.projectTask.taskId} not found`);
      
      const customerDetail = projectDetail.customer;
      if (!customerDetail) throw new BadRequestException(`Customer with ID ${projectDetail.customerId} not found`);

      return plainToInstance(GetAllTimeSheetOfUserDto, {
        ...timesheet,

        projectName: projectDetail.name,
        projectCode: projectDetail.code,
        
        taskName: taskDetail.name,
        projectTaskId: timesheet.projectTask.taskId,
        
        customerName: customerDetail.name,
      }, { excludeExtraneousValues: true });
    })) as GetAllTimeSheetOfUserDto[];
  }

  async getTimesheetById(timesheetId: number): Promise<TimesheetDto | null> {
    const timesheet = await this.repositories.timesheet.findByTimesheetId(timesheetId);
    if (!timesheet) throw new BadRequestException(`Timesheet with ID ${timesheetId} not found`);

    // Validate project is active (disable for demo) (error in UI)
    if (timesheet.projectTask.project.status !== 0) {
      throw new BadRequestException(`Project with ID ${timesheet.projectTask.project.id} is inactive`);
    }

    return plainToInstance(TimesheetDto, {
      ...timesheet,
      projectTargetUserId: timesheet.targetTimesheet ? timesheet.targetTimesheet.userId : null,
      targetUserWorkingTime: timesheet.targetTimesheet ? timesheet.targetTimesheet.workingTime : 0
    }, { excludeExtraneousValues: true });
  }

  async warningMyTimesheet(
    userId: number,
    timesheetId: number | null,
    dateAt: Date,
    workingTime: number
  ): Promise<WarningMyTimesheetDto | null> {
    // Validate timesheetId
    if (timesheetId) {
      const existingTimesheet = await this.repositories.timesheet.findByTimesheetId(timesheetId);
      if (!existingTimesheet) {
        throw new BadRequestException(`Timesheet with ID ${timesheetId} not found`);
      }
      if (existingTimesheet.userId !== userId) {
        throw new BadRequestException(`Timesheet with ID ${timesheetId} does not belong to User with ID ${userId}`);
      }
    }

    // Change workingTime to hours
    const workingTimeHours = workingTime / 60;
    if (workingTimeHours < 0 || workingTimeHours > 16) {
      throw new BadRequestException('workingTime must be between 0 and 16 hours');
    }

    // Get workingTimeLogged from UserId with typeOfWork = NormalWorking (0) and targetTimesheet = null
    const targetDate = new Date(dateAt);
    let workingTimeLogged = 0;
    const timesheetsWithTypeOfWork = await this.repositories.timesheet.findByUserIdAndTypeOfWork(userId, 0);
    timesheetsWithTypeOfWork.forEach(ts => {
      if (ts.dateAt.toISOString() === targetDate.toISOString() 
          && ts.shadowTimesheets.length === 0 
          && ts.id !== timesheetId) {
        workingTimeLogged += ts.workingTime;
      }
    });

    return plainToInstance(WarningMyTimesheetDto, {
      userId: userId,
      dateAt: targetDate,
      workingTime: workingTime,
      workingTimeLogged: workingTimeLogged,
    });
  }

  async createMyTimesheet(
    userId: number,
    timesheet: CreateMyTimesheetDto
  ): Promise<TimesheetDto | null> {
    // Validate projectId and projectTaskId
    const project = await this.repositories.project.getProjectById(timesheet.projectId);
    if (!project) throw new BadRequestException(`Project with ID ${timesheet.projectId} not found`);
    if (project.status !== 0) throw new BadRequestException(`Cannot create timesheet for inactive project with ID ${timesheet.projectId}`);
    
    const projectTask = project.projectTasks.find(pt => pt.id === timesheet.projectTaskId);
    if (!projectTask) {
      throw new BadRequestException(`Project task with ID ${timesheet.projectTaskId} not found in Project with ID ${timesheet.projectId}`);
    }

    // Validate user and target user in project
    const projectUser = project.projectUsers.find(pu => pu.userId === userId);
    if (!projectUser) {
      throw new BadRequestException(`User with ID ${userId} not found in Project with ID ${timesheet.projectId}`);
    }
    if (timesheet.projectTargetUserId) {
      const targetUser = project.projectTargetUsers.find(utu => utu.userId === timesheet.projectTargetUserId);
      if (!targetUser) {
        throw new BadRequestException(`Target user with ID ${timesheet.projectTargetUserId} not found in Project with ID ${timesheet.projectId}`);
      }
      if (!timesheet.targetUserWorkingTime) {
        throw new BadRequestException('Target user working time is required');
      }
    }

    // Validate typeOfWork and isCharged
    if (timesheet.typeOfWork < 1 && timesheet.isCharged) {
      throw new BadRequestException('Cannot enable isCharged for normal working time');
    }

    // Validate working time of user
    timesheet.dateAt = new Date(timesheet.dateAt);
    const warning = await this.warningMyTimesheet(userId, null, timesheet.dateAt, timesheet.workingTime) as any;
    if (convertTimeStringToMinutes(warning.workingTimeLogged) + timesheet.workingTime > 16 * 60) {
      throw new BadRequestException('Total working time in a day cannot exceed 16 hours');
    }

    // Validate dateAt is not in the past week
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    const startOfCurrentWeekVN = new Date(startOfCurrentWeek.getTime() + 7 * 60 * 60 * 1000);
    if (timesheet.dateAt < startOfCurrentWeekVN) {
      throw new BadRequestException(`Timesheet was locked! 
      You can log timesheet begin: ${startOfCurrentWeekVN.toISOString().split('T')[0]}`);
    }

    // Validate dateAt is not in Project's duration
    if (timesheet.dateAt < new Date(project.timeStart) || timesheet.dateAt > new Date(project.timeEnd)) {
      throw new BadRequestException(`Timesheet date must be within the project's duration`);
    }

    // Add working time for target user if projectTargetUserId is provided
    let targetTimesheetId: number | null = null;
    if (timesheet.projectTargetUserId) {
      const newTimesheetForTargetUser: Partial<Timesheet> = {
        ...timesheet,
        userId: timesheet.projectTargetUserId,
        projectTaskId: projectTask.id,
        billable: projectTask.billable,
        workingTime: timesheet.targetUserWorkingTime
      };
      const targetTimesheet = await this.repositories.timesheet.saveTimesheet(newTimesheetForTargetUser);
      targetTimesheetId = targetTimesheet.id;
    }

    const newTimesheetForUser: Partial<Timesheet> = {
      ...timesheet,
      userId: userId,
      projectTaskId: projectTask.id,
      billable: projectTask.billable,
      isTemp: projectUser.isTemp,
      ...(targetTimesheetId !== null ? { targetTimesheetId: targetTimesheetId } : {})
    };
    
    return plainToInstance(
      TimesheetDto,
      await this.repositories.timesheet.saveTimesheet(newTimesheetForUser),
      { excludeExtraneousValues: true }
    );
  }

  async updateMyTimesheet(
    userId: number,
    timesheet: UpdateMyTimesheetDto
  ): Promise<TimesheetDto | null> {
    // Validate timesheet status
    if (timesheet.status === 2) throw new BadRequestException('Cannot update approved timesheet');

    // Validate timesheetId
    const existingTimesheet = await this.repositories.timesheet.findByTimesheetId(timesheet.id);
    if (!existingTimesheet) {
      throw new BadRequestException(`Timesheet with ID ${timesheet.id} not found`);
    }

    // Validate projectId
    const project = await this.repositories.project.getProjectById(timesheet.projectId);
    if (!project) throw new BadRequestException(`Project with ID ${timesheet.projectId} not found`);
    
    // If the project is changed, ensure the new project is active
    const existingProject = existingTimesheet.projectTask.project;
    if (existingProject.id !== project.id) {
      if (project.status !== 0) throw new BadRequestException(`Cannot update timesheet for inactive project with ID ${timesheet.projectId}`);
    }

    // Validate projectTaskId
    const projectTask = project.projectTasks.find(pt => pt.id === timesheet.projectTaskId);
    if (!projectTask) {
      throw new BadRequestException(`Project task with ID ${timesheet.projectTaskId} not found in Project with ID ${timesheet.projectId}`);
    }

    // Validate user and target user in project
    const projectUser = project.projectUsers.find(pu => pu.userId === userId);
    if (!projectUser) {
      throw new BadRequestException(`User with ID ${userId} not found in Project with ID ${timesheet.projectId}`);
    }
    if (timesheet.projectTargetUserId) {
      const targetUser = project.projectTargetUsers.find(utu => utu.userId === timesheet.projectTargetUserId);
      if (!targetUser) {
        throw new BadRequestException(`Target user with ID ${timesheet.projectTargetUserId} not found in Project with ID ${timesheet.projectId}`);
      }
      if (!timesheet.targetUserWorkingTime) {
        throw new BadRequestException('Target user working time is required');
      }
    }

    // Validate typeOfWork and isCharged
    if (timesheet.typeOfWork < 1 && timesheet.isCharged) {
      throw new BadRequestException('Cannot enable isCharged for normal working time');
    }

    // Validate working time of user
    timesheet.dateAt = new Date(timesheet.dateAt);
    const warning = await this.warningMyTimesheet(userId, timesheet.id, timesheet.dateAt, timesheet.workingTime) as any;
    if (convertTimeStringToMinutes(warning.workingTimeLogged) + timesheet.workingTime > 16 * 60) {
      throw new BadRequestException('Total working time in a day cannot exceed 16 hours');
    }
    
    // Validate dateAt is not in the past week
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    const startOfCurrentWeekVN = new Date(startOfCurrentWeek.getTime() + 7 * 60 * 60 * 1000);
    if (timesheet.dateAt < startOfCurrentWeekVN) {
      throw new BadRequestException(`Timesheet was locked! 
      You can log timesheet begin: ${startOfCurrentWeekVN.toISOString().split('T')[0]}`);
    }

    // Validate dateAt is not in Project's duration
    if (timesheet.dateAt < new Date(project.timeStart) || timesheet.dateAt > new Date(project.timeEnd)) {
      throw new BadRequestException(`Timesheet date must be within the project's duration`);
    }

    // Remove old target timesheet
    if(existingTimesheet.targetTimesheet) {
      // Remove reference to targetTimesheetId before deleting to avoid foreign key constraint error
      await this.repositories.timesheet.save({
        ...existingTimesheet,
        targetTimesheetId: null as any,
        targetTimesheet: null as any
      });

      // Officially remove the old target timesheet
      await this.repositories.timesheet.remove(existingTimesheet.targetTimesheet);
    }
    
    // Update target user if projectTargetUserId is provided
    let targetTimesheetId: number | null = null;
    if (timesheet.projectTargetUserId) {
      const newTimesheetForTargetUser: Partial<Timesheet> = {
        ...timesheet,
        id: undefined,
        userId: timesheet.projectTargetUserId,
        projectTaskId: projectTask.id,
        billable: projectTask.billable,
        workingTime: timesheet.targetUserWorkingTime
      };
      const targetTimesheet = await this.repositories.timesheet.saveTimesheet(newTimesheetForTargetUser);
      targetTimesheetId = targetTimesheet.id;
    }

    const newTimesheetForUser: Partial<Timesheet> = {
      ...timesheet,
      userId: userId,
      projectTaskId: projectTask.id,
      billable: projectTask.billable,
      isTemp: projectUser.isTemp,
      ...(targetTimesheetId !== null ? { targetTimesheetId: targetTimesheetId } : {})
    };
    
    return plainToInstance(
      TimesheetDto,
      await this.repositories.timesheet.saveTimesheet(newTimesheetForUser),
      { excludeExtraneousValues: true }
    );
  }

  async saveListMyTimesheet(
    userId: number,
    timesheets: saveListDto[]
  ): Promise<TimesheetDto[]> {
    if (timesheets.length === 0) throw new BadRequestException('Timesheet list is empty');

    const project = await this.repositories.project.getProjectByProjectTaskId(timesheets[0].projectTaskId);
    if (!project) {
      throw new BadRequestException(`Project for Project Task ID ${timesheets[0].projectTaskId} not found`);
    }

    const savedTimesheets: TimesheetDto[] = [];
    for (const timesheet of timesheets) {
      const savedTimesheet = await this.createMyTimesheet(userId, 
        plainToInstance(CreateMyTimesheetDto, {
          ...timesheet,
          projectId: project.id
        })
      );

      if (savedTimesheet) savedTimesheets.push(savedTimesheet);
    }

    return savedTimesheets;
  }

  async submitToPending(
    userId: number,
    startDate: Date,
    endDate: Date
  ): Promise<string> {
    const timesheets = await this.getAllTimeSheetOfUser(userId, startDate, endDate) as any[];

    // Validate dateAt is not in the past
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    const startOfCurrentWeekVN = new Date(startOfCurrentWeek.getTime() + 7 * 60 * 60 * 1000);
    for (const ts of timesheets) {
      if (ts.dateAt < startOfCurrentWeekVN) {
        throw new BadRequestException(`Go to ims.nccsoft.vn > Unlock timesheet`);
      }
    }

    let cnt = 0;
    for (const ts of timesheets) {
      if (ts.status === 0 || ts.status === 3) {
        // Change status to 1 (Pending)
        await this.repositories.timesheet.saveTimesheet({
          id: ts.id,
          status: 1
        });

        // If the timesheet has a targetTimesheet, change its status to 1 (Pending) as well
        if(ts.targetTimesheetId) {
          await this.repositories.timesheet.saveTimesheet({
            id: ts.targetTimesheetId,
            status: 1
          });
        }

        cnt++;
      }
    }

    return 'Submitted ' + cnt + ' timesheets to pending';
  }

  async deleteMyTimesheet(
    userId: number,
    timesheetId: number
  ): Promise<void> {
    // Validate timesheetId
    const existingTimesheet = await this.repositories.timesheet.findByTimesheetId(timesheetId);
    if (!existingTimesheet) {
      throw new BadRequestException(`Timesheet with ID ${timesheetId} not found`);
    }
    if (existingTimesheet.userId !== userId) {
      throw new BadRequestException(`Timesheet with ID ${timesheetId} does not belong to User with ID ${userId}`);
    }

    // Validate dateAt is not in the past
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    const startOfCurrentWeekVN = new Date(startOfCurrentWeek.getTime() + 7 * 60 * 60 * 1000);
    if (existingTimesheet.dateAt < startOfCurrentWeekVN) {
      throw new BadRequestException(`Go to ims.nccsoft.vn > Unlock timesheet`);
    }

    // Validate status
    if (existingTimesheet.status === 2) throw new BadRequestException('Cannot delete approved timesheet');

    // Validate shadowTimesheets
    if (existingTimesheet.shadowTimesheets.length > 0) {
      throw new BadRequestException('Cannot delete timesheet that has shadow timesheets');
    }

    // Remove the timesheet
    if(existingTimesheet.targetTimesheet) {
      await this.repositories.timesheet.remove(existingTimesheet.targetTimesheet);
    } else {
      await this.repositories.timesheet.remove(existingTimesheet);
    }
  }
}