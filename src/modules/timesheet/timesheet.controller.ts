import { Controller, Get, Query, Body, Post, HttpCode, Request } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { TimesheetService } from 'src/modules/timesheet/timesheet.service';
import { GetAllDto, ResponseApproveTimesheetsDto, ResponseGetAllDto, ResponseGetQuantityDto, ResponseGetTimesheetWarningDto, ResponseRejectTimesheetsDto } from './timesheet.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('Timesheet')
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) {}
  
  @Get("GetAll")
  @ApiOkResponse({ type: [ResponseGetAllDto] })
  async getAll(
    @Query() getAll: GetAllDto,
    @Request() req: ExpressRequest
  ): Promise<ResponseGetAllDto[]> {
    return this.timesheetService.getAll(req['user'].id, getAll);
  }

  @Get("GetQuantiyTimesheetStatus")
  @ApiOkResponse({ type: [ResponseGetQuantityDto] })
  async getQuantiyTimesheetStatus(
    @Query() getAll: GetAllDto,
    @Request() req: ExpressRequest
  ): Promise<ResponseGetQuantityDto[]> {
    return this.timesheetService.getQuantiyTimesheetStatus(req['user'].id, getAll);
  }

  @Post("GetTimesheetWarning")
  @HttpCode(200)
  @ApiOkResponse({ type: [ResponseGetTimesheetWarningDto] })
  async getTimesheetWarning(@Body() timesheetIds: number[]): Promise<ResponseGetTimesheetWarningDto[]> {
    return this.timesheetService.getTimesheetWarning(timesheetIds);
  }

  @Post("ApproveTimesheets")
  @HttpCode(200)
  @ApiOkResponse({ type: ResponseApproveTimesheetsDto })
  async approveTimesheets(
    @Body() timesheetIds: number[],
    @Request() req: ExpressRequest
  ): Promise<ResponseApproveTimesheetsDto> {
    return this.timesheetService.approveTimesheets(req['user'].id, timesheetIds);
  }

  @Post("RejectTimesheets")
  @HttpCode(200)
  @ApiOkResponse({ type: ResponseRejectTimesheetsDto })
  async rejectTimesheets(
    @Body() timesheetIds: number[],
    @Request() req: ExpressRequest
  ): Promise<ResponseRejectTimesheetsDto> {
    return this.timesheetService.rejectTimesheets(req['user'].id, timesheetIds);
  }
}