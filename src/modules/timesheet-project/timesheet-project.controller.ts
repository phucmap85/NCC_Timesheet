import { Controller, Get, Query } from '@nestjs/common';
import { TimesheetProjectService } from 'src/modules/timesheet-project/timesheet-project.service';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  GetTimesheetStatisticDto,
  ResponseGetTimesheetStatisticTasksDto,
  ResponseGetTimesheetStatisticTeamsDto,
  ResponseExportBillableTimesheetsDto
} from './timesheet-project.dto';

@Controller('TimeSheetProject')
export class TimesheetProjectController {
  constructor(private readonly timesheetProjectService: TimesheetProjectService) {}

  @Get("GetTimeSheetStatisticTasks")
  @ApiOkResponse({ type: [ResponseGetTimesheetStatisticTasksDto] })
  async getTimesheetStatisticTasks(
    @Query() req: GetTimesheetStatisticDto
  ): Promise<ResponseGetTimesheetStatisticTasksDto[]> {
    return this.timesheetProjectService.getTimesheetStatisticTasks(req);
  }

  @Get("GetTimeSheetStatisticTeams")
  @ApiOkResponse({ type: [ResponseGetTimesheetStatisticTeamsDto] })
  async getTimesheetStatisticTeams(
    @Query() req: GetTimesheetStatisticDto
  ): Promise<ResponseGetTimesheetStatisticTeamsDto[]> {
    return this.timesheetProjectService.getTimesheetStatisticTeams(req);
  }

  @Get("ExportBillableTimesheets")
  @ApiOkResponse({ type: [ResponseExportBillableTimesheetsDto] })
  async exportBillableTimesheets(
    @Query() req: GetTimesheetStatisticDto
  ): Promise<ResponseExportBillableTimesheetsDto[]> {
    return this.timesheetProjectService.exportBillableTimesheets(req);
  }
}