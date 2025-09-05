import { Controller, Get, Query } from '@nestjs/common';
import { TimesheetProjectService } from 'src/modules/timesheet-project/timesheet-project.service';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  GetTimesheetStatisticDto,
  ResponseGetTimesheetStatisticTasksDto,
  ResponseGetTimesheetStatisticTeamsDto,
  ResponseExportBillableTimesheetsDto
} from './timesheet-project.dto';
import { Permissions } from 'src/common/constants/enum';
import { HasPermissions } from 'src/common/decorators/permisson.decorator';

@Controller('TimeSheetProject')
export class TimesheetProjectController {
  constructor(private readonly timesheetProjectService: TimesheetProjectService) {}

  @Get("GetTimeSheetStatisticTasks")
  @HasPermissions(Permissions.Project, Permissions.Project_View)
  @ApiOkResponse({ type: [ResponseGetTimesheetStatisticTasksDto] })
  async getTimesheetStatisticTasks(
    @Query() req: GetTimesheetStatisticDto
  ): Promise<ResponseGetTimesheetStatisticTasksDto[]> {
    return this.timesheetProjectService.getTimesheetStatisticTasks(req);
  }

  @Get("GetTimeSheetStatisticTeams")
  @HasPermissions(Permissions.Project, Permissions.Project_View)
  @ApiOkResponse({ type: [ResponseGetTimesheetStatisticTeamsDto] })
  async getTimesheetStatisticTeams(
    @Query() req: GetTimesheetStatisticDto
  ): Promise<ResponseGetTimesheetStatisticTeamsDto[]> {
    return this.timesheetProjectService.getTimesheetStatisticTeams(req);
  }

  @Get("ExportBillableTimesheets")
  @HasPermissions(Permissions.Project, Permissions.Project_Export)
  @ApiOkResponse({ type: [ResponseExportBillableTimesheetsDto] })
  async exportBillableTimesheets(
    @Query() req: GetTimesheetStatisticDto
  ): Promise<ResponseExportBillableTimesheetsDto[]> {
    return this.timesheetProjectService.exportBillableTimesheets(req);
  }
}