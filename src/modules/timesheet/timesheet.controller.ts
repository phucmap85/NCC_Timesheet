import { Controller, Get, Query, Body, Post, HttpCode, Request } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { TimesheetService } from 'src/modules/timesheet/timesheet.service';
import { GetAllDto, ResponseApproveTimesheetsDto, ResponseGetAllDto, ResponseGetQuantityDto, ResponseGetTimesheetWarningDto, ResponseRejectTimesheetsDto } from './timesheet.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { Permissions } from 'src/common/constants/enum';
import { HasPermissions } from 'src/common/decorators/permisson.decorator';

@Controller('Timesheet')
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) {}
  
  @Get("GetAll")
  @HasPermissions(Permissions.Timesheet, Permissions.Timesheet_View)
  @ApiOkResponse({ type: [ResponseGetAllDto] })
  async getAll(
    @Query() getAll: GetAllDto,
    @Request() req: ExpressRequest
  ): Promise<ResponseGetAllDto[]> {
    return this.timesheetService.getAll(req['user'].id, getAll);
  }

  @Get("GetQuantiyTimesheetStatus")
  @HasPermissions(Permissions.Timesheet, Permissions.Timesheet_ViewStatus)
  @ApiOkResponse({ type: [ResponseGetQuantityDto] })
  async getQuantiyTimesheetStatus(
    @Query() getAll: GetAllDto,
    @Request() req: ExpressRequest
  ): Promise<ResponseGetQuantityDto[]> {
    return this.timesheetService.getQuantiyTimesheetStatus(req['user'].id, getAll);
  }

  @Post("GetTimesheetWarning")
  @HasPermissions(Permissions.Timesheet, Permissions.Timesheet_View)
  @HttpCode(200)
  @ApiOkResponse({ type: [ResponseGetTimesheetWarningDto] })
  async getTimesheetWarning(@Body() timesheetIds: number[]): Promise<ResponseGetTimesheetWarningDto[]> {
    return this.timesheetService.getTimesheetWarning(timesheetIds);
  }

  @Post("ApproveTimesheets")
  @HasPermissions(Permissions.Timesheet, Permissions.Timesheet_Approval)
  @HttpCode(200)
  @ApiOkResponse({ type: ResponseApproveTimesheetsDto })
  async approveTimesheets(
    @Body() timesheetIds: number[],
    @Request() req: ExpressRequest
  ): Promise<ResponseApproveTimesheetsDto> {
    return this.timesheetService.approveTimesheets(req['user'].id, timesheetIds);
  }

  @Post("RejectTimesheets")
  @HasPermissions(Permissions.Timesheet, Permissions.Timesheet_Approval)
  @HttpCode(200)
  @ApiOkResponse({ type: ResponseRejectTimesheetsDto })
  async rejectTimesheets(
    @Body() timesheetIds: number[],
    @Request() req: ExpressRequest
  ): Promise<ResponseRejectTimesheetsDto> {
    return this.timesheetService.rejectTimesheets(req['user'].id, timesheetIds);
  }
}