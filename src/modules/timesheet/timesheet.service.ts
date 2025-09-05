import { BadRequestException, Injectable } from '@nestjs/common';
import { RepositoryManager } from 'src/common/repositories';
import {
  GetAllDto, 
  ResponseApproveTimesheetsDto, 
  ResponseRejectTimesheetsDto,
  ResponseGetAllDto, 
  ResponseGetQuantityDto, 
  ResponseGetTimesheetWarningDto,
} from './timesheet.dto';
import { plainToInstance } from 'class-transformer';
import { format } from 'date-fns';

@Injectable()
export class TimesheetService {
  constructor(private readonly repositories: RepositoryManager) {}

  async getAll(userId: number, getAll: GetAllDto): Promise<ResponseGetAllDto[]> {
    // Validate date range
    if (getAll.startDate > getAll.endDate) {
      throw new BadRequestException('Start date must be before or equal to end date');
    }

    const query = this.repositories.timesheet.createQueryBuilder('timesheet')
      // Get timesheet details
      .leftJoinAndSelect('timesheet.user', 'user')
      .leftJoinAndSelect('timesheet.projectTask', 'projectTask')
      .leftJoinAndSelect('timesheet.approver', 'approver')
      .leftJoinAndSelect('timesheet.targetTimesheet', 'targetTimesheet')
      .leftJoinAndSelect('timesheet.shadowTimesheets', 'shadowTimesheets')
      // Get target timesheet details
      .leftJoinAndSelect('targetTimesheet.user', 'targetUser')
      .leftJoinAndSelect('targetTimesheet.projectTask', 'targetProjectTask')
      .leftJoinAndSelect('targetProjectTask.project', 'targetProject')
      // Get project and task details
      .leftJoinAndSelect('projectTask.project', 'project')
      .leftJoinAndSelect('projectTask.task', 'task')
      // Get user branch
      .leftJoinAndSelect('user.branch', 'branch')
      // Get project details
      .leftJoinAndSelect('project.customer', 'customer')
      .leftJoinAndSelect('project.projectUsers', 'projectUsers')
      .leftJoinAndSelect('projectUsers.user', 'projectUser');
    
    if (getAll.startDate && getAll.endDate) {
      query.andWhere('timesheet.dateAt BETWEEN :startDate AND :endDate', { startDate: getAll.startDate, endDate: getAll.endDate });
    }

    if (getAll.status != -1) query.andWhere('timesheet.status = :status', { status: getAll.status });
    if (getAll.projectId) query.andWhere('project.id = :projectId', { projectId: getAll.projectId });
    if (getAll.branchId) query.andWhere('user.branchId = :branchId', { branchId: getAll.branchId });

    if (getAll.searchText) {
      const searchText = `%${getAll.searchText.trim().toLowerCase()}%`;
      query.andWhere('user.userName LIKE :searchText', { searchText });
    }
    
    const data = await query.orderBy('timesheet.createdAt', 'DESC').getMany();

    const filteredShadowTimesheets = data.filter(item => item.shadowTimesheets.length <= 0);
    const filteredPMs = filteredShadowTimesheets.filter(item => {
      const projectPMs = item.projectTask.project.projectUsers
        .filter(pu => pu.type === 1)  // PM
        .map(pu => pu.userId);
      return projectPMs.includes(userId);
    });

    const result = filteredPMs.map(item => {
      const projectUser = item.projectTask.project.projectUsers.find(pu => pu.userId === item.user.id);
      const projectPMs = item.projectTask.project.projectUsers
        .filter(pu => pu.type === 1)  // PM
        .map(pu => pu.user?.fullName)
        .filter(name => name);
      
      Reflect.deleteProperty(item.user, 'id');
        
      return plainToInstance(ResponseGetAllDto, {
        // Timesheet basic info
        ...item,
        mytimesheetNote: item.note,
        lastModificationTime: item.updatedAt,
        
        // User info
        ...item.user,
        user: item.user.fullName,
        
        // Project info
        projectId: item.projectTask.project?.id,
        projectName: item.projectTask.project?.name,
        projectCode: item.projectTask.project?.code,
        customerName: item.projectTask.project?.customer?.name,
        listPM: projectPMs.length > 0 ? projectPMs : null,
        
        // Task info
        taskId: item.projectTask.task?.id,
        taskName: item.projectTask.task?.name,
        
        // Branch info
        branchName: item.user.branch?.name,
        branch: item.user.branch?.name,
        branchColor: item.user.branch?.color,
        branchDisplayName: item.user.branch?.displayName,
        
        // Project user info
        projectUserType: projectUser?.type,
        
        // Target user info (if exists)
        projectTargetUser: item.targetTimesheet?.user?.fullName,
        workingTimeTargetUser: item.targetTimesheet?.workingTime,
      }, { excludeExtraneousValues: true });
    });

    return result as ResponseGetAllDto[];
  }

  async getQuantiyTimesheetStatus(userId: number, getAll: GetAllDto): Promise<ResponseGetQuantityDto[]> {
    // Validate date range
    if (getAll.startDate > getAll.endDate) {
      throw new BadRequestException('Start date must be before or equal to end date');
    }

    const query = this.repositories.timesheet.createQueryBuilder('timesheet')
      .leftJoinAndSelect('timesheet.user', 'user')
      .leftJoinAndSelect('timesheet.shadowTimesheets', 'shadowTimesheets')
      .leftJoinAndSelect('timesheet.projectTask', 'projectTask')
      .leftJoinAndSelect('projectTask.project', 'project')
      .leftJoinAndSelect('project.projectUsers', 'projectUsers');
    
    if (getAll.startDate && getAll.endDate) {
      query.andWhere('timesheet.dateAt BETWEEN :startDate AND :endDate', { startDate: getAll.startDate, endDate: getAll.endDate });
    }

    if (getAll.projectId) query.andWhere('project.id = :projectId', { projectId: getAll.projectId });
    if (getAll.branchId) query.andWhere('user.branchId = :branchId', { branchId: getAll.branchId });

    if (getAll.searchText) {
      const searchText = `%${getAll.searchText.trim().toLowerCase()}%`;
      query.andWhere('user.userName LIKE :searchText', { searchText });
    }
    
    const data = await query.orderBy('timesheet.createdAt', 'DESC').getMany();

    const filteredShadowTimesheets = data.filter(item => item.shadowTimesheets.length <= 0);
    const filteredPMs = filteredShadowTimesheets.filter(item => {
      const projectPMs = item.projectTask.project.projectUsers
        .filter(pu => pu.type === 1)  // PM
        .map(pu => pu.userId);
      return projectPMs.includes(userId);
    });

    const statusCount = filteredPMs.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);

    const result = [-1, 0, 1, 2, 3].map(status => ({
      status, quantity: statusCount[status] || 0
    }));

    return result as ResponseGetQuantityDto[];
  }

  async getTimesheetWarning(timesheetIds: number[]): Promise<ResponseGetTimesheetWarningDto[]> {
    for (const id of timesheetIds) {
      if (typeof id !== 'number' || id <= 0) throw new BadRequestException('Invalid timesheet ID');
    }

    const timesheets = await this.repositories.timesheet.findByTimesheetIds(timesheetIds);
    if (timesheets.length !== timesheetIds.length) {
      throw new BadRequestException('One or more timesheet IDs do not exist');
    }

    return timesheets.map(ts => {
      if (ts.status === 0) throw new BadRequestException(`Timesheet ID ${ts.id} should be submitted before approval`);
      if (ts.status === 2) throw new BadRequestException(`Timesheet ID ${ts.id} is already approved`);
      if (ts.shadowTimesheets.length > 0) throw new BadRequestException(`Timesheet ID ${ts.id} is a shadow timesheet and cannot be approved directly`);

      Reflect.deleteProperty(ts.user, 'id');

      return plainToInstance(ResponseGetTimesheetWarningDto, {
        ...ts, ...ts.user,
        
        projectName: ts.projectTask?.project?.name,
        taskName: ts.projectTask?.task?.name,

        workingTimeHour: ts.workingTime / 60
      }, { excludeExtraneousValues: true });
    }) as ResponseGetTimesheetWarningDto[];
  }

  async approveTimesheets(userId: number, timesheetIds: number[]): Promise<ResponseApproveTimesheetsDto> {
    for (const id of timesheetIds) {
      if(typeof id !== 'number' || id <= 0) throw new BadRequestException('Invalid timesheet ID');
    }

    const timesheets = await this.repositories.timesheet.findByTimesheetIds(timesheetIds);
    if (timesheets.length !== timesheetIds.length) {
      throw new BadRequestException('One or more timesheet IDs do not exist');
    }
    if (timesheets.some(ts => { ts.projectTask.project.projectUsers.filter(pu => pu.type === 1).map(pu => pu.userId).includes(userId) === false })) {
      throw new BadRequestException('You do not have permission to approve one or more of the specified timesheets');
    }

    let success = 0, error = 0;
    for (const ts of timesheets) {
      if (ts.status === 0) throw new BadRequestException(`Timesheet ID ${ts.id} should be submitted before approval`);
      if (ts.status === 2) throw new BadRequestException(`Timesheet ID ${ts.id} is already approved`);
      if (ts.shadowTimesheets.length > 0) throw new BadRequestException(`Timesheet ID ${ts.id} is a shadow timesheet and cannot be approved directly`);

      ts.status = 2;
      
      try {
        await this.repositories.timesheet.saveTimesheet(ts);
        success++;
      } catch (e) {
        error++;
      }

      if (ts.targetTimesheet) {
        ts.targetTimesheet.status = 2;

        try {
          await this.repositories.timesheet.saveTimesheet(ts.targetTimesheet);
        } catch (e) {
          throw new BadRequestException(`Failed to approve target timesheet ID ${ts.targetTimesheet.id}`);
        }
      }
    }

    const date = format(new Date().toISOString().split('T')[0], 'dd-MM-yyyy');

    return plainToInstance(ResponseApproveTimesheetsDto, { 
      success: ` - Success ${success} timesheets.`,
      successCount: success,
      fail: ` - Fail ${error} timesheets.`,
      failedCount: error,
      lockDate: ` - Locked date: ${date}.`
    }, { excludeExtraneousValues: true });
  }

  async rejectTimesheets(userId: number, timesheetIds: number[]): Promise<ResponseRejectTimesheetsDto> {
    for (const id of timesheetIds) {
      if(typeof id !== 'number' || id <= 0) throw new BadRequestException('Invalid timesheet ID');
    }

    const timesheets = await this.repositories.timesheet.findByTimesheetIds(timesheetIds);
    if (timesheets.length !== timesheetIds.length) {
      throw new BadRequestException('One or more timesheet IDs do not exist');
    }
    if (timesheets.some(ts => { ts.projectTask.project.projectUsers.filter(pu => pu.type === 1).map(pu => pu.userId).includes(userId) === false })) {
      throw new BadRequestException('You do not have permission to reject one or more of the specified timesheets');
    }

    let success = 0, error = 0;
    for (const ts of timesheets) {
      if (ts.status === 0) throw new BadRequestException(`Timesheet ID ${ts.id} should be submitted before rejection`);
      if (ts.status === 3) throw new BadRequestException(`Timesheet ID ${ts.id} is already rejected`);
      if (ts.shadowTimesheets.length > 0) throw new BadRequestException(`Timesheet ID ${ts.id} is a shadow timesheet and cannot be rejected directly`);

      ts.status = 3;
      
      try {
        await this.repositories.timesheet.saveTimesheet(ts);
        success++;
      } catch (e) {
        error++;
      }

      if (ts.targetTimesheet) {
        ts.targetTimesheet.status = 3;

        try {
          await this.repositories.timesheet.saveTimesheet(ts.targetTimesheet);
        } catch (e) {
          throw new BadRequestException(`Failed to reject target timesheet ID ${ts.targetTimesheet.id}`);
        }
      }
    }

    const date = format(new Date().toISOString().split('T')[0], 'dd-MM-yyyy');

    return plainToInstance(ResponseRejectTimesheetsDto, { 
      success: ` - Success ${success} timesheets.`,
      fail: ` - Fail ${error} timesheets.`,
      lockDate: ` - Locked date: ${date}.`
    }, { excludeExtraneousValues: true });
  }
}