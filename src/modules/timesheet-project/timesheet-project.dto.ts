import { IsDateString, IsInt, IsNotEmpty, IsNumber, Min } from "class-validator";
import { Expose, Transform } from "class-transformer";

/////////////////////////////////////// REQUEST DTO ///////////////////////////////////////

export class GetTimesheetStatisticDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => Number(value))
  projectId: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
}

/////////////////////////////////////// RESPONSE DTO ///////////////////////////////////////

export class ResponseGetTimesheetStatisticTasksDto {
  @Expose()
  taskId: number;

  @Expose()
  taskName: string;

  @Expose()
  totalWorkingTime: number;

  @Expose()
  billableWorkingTime: number;

  @Expose()
  billable: boolean;
}

export class ResponseGetTimesheetStatisticTeamsDto {
  @Expose()
  userID: number;

  @Expose()
  userName: string;

  @Expose()
  projectUserType: number;

  @Expose()
  totalWorkingTime: number;

  @Expose()
  billableWorkingTime: number;
}

export class ResponseExportBillableTimesheetsDto {
  @Expose()
  userName: string;

  @Expose()
  dateAt: Date;

  @Expose()
  typeOfWork: number;

  @Expose()
  taskName: string;

  @Expose()
  note: string | null;

  @Expose()
  workingTime: number;

  @Expose()
  targetUserWorkingTime: number;

  @Expose()
  targetUserName: string;

  @Expose()
  roleName: string;

  @Expose()
  isShadow: boolean;

  @Expose()
  id: number;
}