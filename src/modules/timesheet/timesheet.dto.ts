import { IsBoolean, IsDateString, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"
import { Expose, Transform } from "class-transformer";

/////////////////////////////////////// REQUEST DTO ///////////////////////////////////////

export class GetAllDto {
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsIn([-1, 0, 1, 2, 3], { 
    message: "Status must be -1 (All), 0 (Draft), 1 (Pending), 2 (Approved), 3 (Rejected)"
  })
  @Transform(({ value }) => Number(value) ?? -1)
  status?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => Number(value))
  @Transform(({ value }) => value === 0 ? undefined : value)
  projectId?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => Number(value))
  @Transform(({ value }) => value === 0 ? undefined : value)
  checkInFilter?: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim() ?? '')
  searchText?: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => Number(value))
  @Transform(({ value }) => value === 0 ? undefined : value)
  branchId?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => Number(value))
  @Transform(({ value }) => value === 0 ? undefined : value)
  opentalkTime?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  opentalkTimeType?: boolean;
}

/////////////////////////////////////// RESPONSE DTO ///////////////////////////////////////

export class ResponseGetAllDto {
  @Expose()
  @Transform(({ value }) => value ?? false)
  isOffDay: boolean; // k lam // done

  @Expose()
  emailAddress: string; // done // done

  @Expose()
  status: number; // done // done

  @Expose()
  workingTime: number; // done // done

  @Expose()
  dateAt: Date; // done // done

  @Expose()
  projectId: number; // done // done

  @Expose()
  user: string; // done // done

  @Expose()
  userId: number; // done // done

  @Expose()
  taskId: number; // done

  @Expose()
  taskName: string; // done

  @Expose()
  mytimesheetNote: string | null; // done

  @Expose()
  customerName: string; // done

  @Expose()
  projectName: string; // done

  @Expose()
  projectCode: string; // done

  @Expose()
  typeOfWork: number; // done

  @Expose()
  isCharged: boolean; // done

  @Expose()
  @Transform(({ value }) => value ?? true)
  isUserInProject: boolean; // set default true

  @Expose()
  branchName: string | null; // done

  @Expose()
  branch: string | null; // done

  @Expose()
  @Transform(({ value }) => value ?? null)
  type: string | null; // done

  @Expose()
  avatarPath: string; // done

  @Expose()
  avatarFullPath: string; // done

  @Expose()
  level: number | null; // done

  @Expose()
  listPM: string[] | null; // done

  @Expose()
  lastModificationTime: Date;

  @Expose()
  branchColor: string; // done

  @Expose()
  branchDisplayName: string; // done

  @Expose()
  @Transform(({ value }) => value ?? null)
  lastModifierUser: string | null; // k lam

  @Expose()
  isTemp: boolean; // done

  @Expose()
  @Transform(({ value }) => value ?? false)
  isUnlockedByEmployee: boolean;

  @Expose()
  @Transform(({ obj }) => obj.isTemp ? "Temp" : "Official")
  workType: string; // done

  @Expose()
  @Transform(({ value }) => value ?? 0)
  offHour: number;

  @Expose()
  @Transform(({ value }) => value ?? null)
  checkIn: Date | null; // null

  @Expose()
  @Transform(({ value }) => value ?? null)
  checkOut: Date | null; // null

  @Expose()
  projectUserType: number;

  @Expose()
  @Transform(({ value }) => value ?? null)
  projectTargetUser: string | null;

  @Expose()
  @Transform(({ obj }) => obj.projectTargetUser ? (obj.workingTimeTargetUser || 0) : 0)
  workingTimeTargetUser: number;

  @Expose()
  @Transform(({ value }) => value ?? null)
  id: number; // done // done
}

export class ResponseGetQuantityDto {
  status: number;
  quantity: number;
}

export class ResponseGetTimesheetWarningDto {
  @Expose()
  userId: number;

  @Expose()
  emailAddress: string;

  @Expose()
  taskName: string;

  @Expose()
  @Transform(({ value }) => value ?? null)
  mytimesheetNote: string | null;

  @Expose()
  projectName: string;

  @Expose()
  workingTime: number;

  @Expose()
  workingTimeHour: number;

  @Expose()
  @Transform(({ value }) => value ?? 0)
  hourOff: number;

  @Expose()
  @Transform(({ value }) => new Date(value))
  dateAt: Date;

  @Expose()
  @Transform(({ value }) => value ?? 0)
  totalWorkingTimeDateAt: number;

  @Expose()
  @Transform(({ value }) => value ?? 0)
  totalWorkingTimeHourDateAt: number;

  @Expose()
  status: number;

  @Expose()
  @Transform(({ value }) => value ?? false)
  isThanDefaultWorkingHourPerDay: boolean;

  @Expose()
  id: number;
}

export class ResponseApproveTimesheetsDto {
  @Expose()
  success: string;

  @Expose()
  successCount: number;

  @Expose()
  fail: string;

  @Expose()
  failedCount: number;

  @Expose()
  lockDate: string;
}

export class ResponseRejectTimesheetsDto {
  @Expose()
  success: string;

  @Expose()
  fail: string;

  @Expose()
  lockDate: string;
}