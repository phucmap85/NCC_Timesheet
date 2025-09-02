import { Controller, Get, Query, Request, ParseDatePipe, ParseIntPipe, Post, HttpCode, Body, Put, Delete, BadRequestException } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import type { Request as ExpressRequest } from 'express';
import { MyTimesheetsService } from 'src/modules/my-timesheets/my-timesheets.service';
import {
  CreateMyTimesheetDto,
  GetAllTimeSheetOfUserDto,
  saveListDto,
  TimesheetDto,
  UpdateMyTimesheetDto,
  WarningMyTimesheetDto
} from './my-timesheets.dto';

@Controller('MyTimesheets')
export class MyTimesheetsController {
  constructor(private readonly myTimesheetsService: MyTimesheetsService) {}

  @Get("GetAllTimeSheetOfUser")
  @ApiOkResponse({ type: GetAllTimeSheetOfUserDto, isArray: true })
  async getAllTimeSheetOfUser(
    @Query("startDate", new ParseDatePipe()) startDate: Date,
    @Query("endDate", new ParseDatePipe()) endDate: Date,
    @Request() req: ExpressRequest,
  ): Promise<GetAllTimeSheetOfUserDto[] | null> {
    return this.myTimesheetsService.getAllTimeSheetOfUser(req['user'].id, startDate, endDate);
  }

  @Get("Get")
  @ApiOkResponse({ type: TimesheetDto })
  async getTimesheetById(@Query("id", ParseIntPipe) timesheetId: number): Promise<TimesheetDto | null> {
    return this.myTimesheetsService.getTimesheetById(timesheetId);
  }

  @Get("WarningMyTimesheet")
  @ApiOkResponse({ type: WarningMyTimesheetDto })
  async warningMyTimesheet(
    @Query("dateAt", new ParseDatePipe()) dateAt: Date,
    @Query("workingTime", ParseIntPipe) workingTime: number,
    @Query("timesheetId", new ParseIntPipe({ optional: true })) timesheetId: number,
    @Request() req: ExpressRequest
  ): Promise<object | null> {
    return this.myTimesheetsService.warningMyTimesheet(
      req['user'].id, timesheetId, dateAt, workingTime
    );
  }

  @Post("Create")
  @HttpCode(200)
  @ApiOkResponse({ type: TimesheetDto })
  async createMyTimesheet(
    @Body() timesheet: CreateMyTimesheetDto,
    @Request() req: ExpressRequest
  ): Promise<TimesheetDto | null> {
    return this.myTimesheetsService.createMyTimesheet(req['user'].id, timesheet);
  }

  @Put("Update")
  @HttpCode(200)
  @ApiOkResponse({ type: TimesheetDto })
  async updateMyTimesheet(
    @Body() timesheet: UpdateMyTimesheetDto,
    @Request() req: ExpressRequest
  ): Promise<TimesheetDto | null> {
    return this.myTimesheetsService.updateMyTimesheet(req['user'].id, timesheet);
  }

  @Post("SaveList")
  @HttpCode(200)
  async saveListMyTimesheet(
    @Body() timesheets: saveListDto[],
    @Request() req: ExpressRequest
  ): Promise<TimesheetDto[]> {
    return this.myTimesheetsService.saveListMyTimesheet(req['user'].id, timesheets);
  }

  @Post("SubmitToPending")
  @HttpCode(200)
  @ApiOkResponse({ type: String })
  async submitToPending(
    @Body("startDate", new ParseDatePipe()) startDate: Date,
    @Body("endDate", new ParseDatePipe()) endDate: Date,
    @Request() req: ExpressRequest
  ): Promise<string> {
    return this.myTimesheetsService.submitToPending(req['user'].id, startDate, endDate);
  }

  @Delete("Delete")
  @HttpCode(200)
  @ApiOkResponse({ type: Boolean })
  async deleteMyTimesheet(
    @Query("Id", ParseIntPipe) timesheetId: number,
    @Request() req: ExpressRequest
  ): Promise<void> {
    return this.myTimesheetsService.deleteMyTimesheet(req['user'].id, timesheetId);
  }
}