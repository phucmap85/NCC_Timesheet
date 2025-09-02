import { OmitType } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Min, IsIn, Max, IsNumber, IsBoolean } from 'class-validator';
import { convertMinutesToTimeString } from 'src/common/utils/converters/time-string.converter';
/////////////////////////////////////// REQUEST DTO ///////////////////////////////////////

export class CreateMyTimesheetDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  projectId: number;
  
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  projectTaskId: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim() || null)
  note?: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  projectTargetUserId?: number;
  
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0, { message: 'Working time must be between 0 and 16 hours' })
  @Max(16 * 60, { // 16 hours in minutes
    message: 'Working time must be between 0 and 16 hours'
  })
  workingTime: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0, { message: 'Target user working time must be between 0 and 16 hours' })
  @Max(16 * 60, { // 16 hours in minutes
    message: 'Target user working time must be between 0 and 16 hours'
  })
  @Transform(({ value }) => value ?? 0)
  targetUserWorkingTime?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value ?? false)
  isCharged?: boolean;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsIn([0, 1], { message: 'Type of work must be 0 (NormalWorking) or 1 (Overtime)' })
  typeOfWork: number;
  
  @IsNotEmpty()
  @IsString()
  @IsDateString()
  dateAt: Date;
}

export class UpdateMyTimesheetDto extends CreateMyTimesheetDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsIn([0, 1, 2, 3], { message: 'Status must be 0 (New), 1 (Pending), 2 (Approved), or 3 (Rejected)' })
  status: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value ?? false)
  isTemp?: boolean;
}

export class saveListDto extends OmitType(CreateMyTimesheetDto, ['projectId'] as const) {}

/////////////////////////////////////// RESPONSE DTO ///////////////////////////////////////

export class WarningMyTimesheetDto {
  userId: number | null;
  dateAt: Date;
  hourOff: number = 0;
  workingTime: number = 0;

  @Transform(({ value }) => convertMinutesToTimeString(value))
  workingTimeLogged: string = "";

  checkIn: Date | null = null;
  checkOut: Date | null = null;
  checkInShow: string = "--:--";
  checkOutShow: string = "--:--";
  isWarning: boolean = true;
  hourDiMuon: number = 0;
  hourVeSom: number = 0;
  isOffHalfDay: boolean = false;
  isOffDay: boolean = false;
  minuteActive: number = -60;
}

export class GetAllTimeSheetOfUserDto {
  @Expose()
  id: number;

  @Expose()
  projectName: string;

  @Expose()
  projectCode: string;

  @Expose()
  taskName: string;

  @Expose()
  projectTaskId: number;

  @Expose()
  targetTimesheetId: number | null;

  @Expose()
  customerName: string;

  @Expose()
  dateAt: Date;

  @Expose()
  workingTime: number;

  @Expose()
  status: number;

  @Expose()
  note: string | null;

  @Expose()
  typeOfWork: number;

  @Expose()
  isCharged: boolean;

  @Expose()
  billable: boolean;

  @Expose()
  isTemp: boolean;

  @Expose()
  @Transform(({ obj }) => obj.isTemp ? "Temp" : "Official")
  workType: string;
}

export class TimesheetDto {
  @Expose()
  id: number;

  @Expose()
  projectTaskId: number;

  @Expose()
  dateAt: Date;

  @Expose()
  workingTime: number;

  @Expose()
  status: number;

  @Expose()
  note: string | null;

  @Expose()
  typeOfWork: number;

  @Expose()
  isCharged: boolean;

  @Expose()
  isTemp: boolean;

  @Expose()
  projectTargetUserId: number | null;

  @Expose()
  targetUserWorkingTime: number;
}