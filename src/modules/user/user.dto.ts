import { Transform } from "class-transformer";
import { 
  IsArray, 
  IsBoolean, 
  IsDateString,
  IsEmail, 
  IsInt, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsString, 
  MaxLength, 
  IsIn,
  Min, Max,
  Matches
} from "class-validator";

export class UserRoleDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  userId: number;
  
  @IsNotEmpty()
  @IsString()
  role: string;
}

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsArray()
  roleNames: string[];
}

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  surname: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  fullName?: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  emailAddress: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  phoneNumber: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsNotEmpty()
  @IsInt()
  @IsIn([0, 1])
  sex: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  managerId?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  positionId?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  branchId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  jobTitle?: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsIn([0, 1, 2])
  @Transform(({ value }) => value === null ? undefined : Number(value))
  type?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(15)
  level?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(15)
  beginLevel?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  salary?: number;

  @IsOptional()
  @IsString()
  @IsDateString()
  salaryAt?: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  allowedLeaveDay?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  @IsDateString()
  startDateAt?: string;

  @IsOptional()
  @IsString()
  @IsDateString()
  endDateAt?: string;

  @IsOptional()
  @IsBoolean()
  isWorkingTimeDefault?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(12)
  morningWorking?: number;

  @IsOptional()
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
    message: 'morningStartAt must be in hh:mm or hh:mm:ss format'
  })
  morningStartAt?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
    message: 'morningEndAt must be in hh:mm or hh:mm:ss format'
  })
  morningEndAt?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(12)
  afternoonWorking?: number;

  @IsOptional()
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
    message: 'afternoonStartAt must be in hh:mm or hh:mm:ss format'
  })
  afternoonStartAt?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
    message: 'afternoonEndAt must be in hh:mm or hh:mm:ss format'
  })
  afternoonEndAt?: string;

  @IsOptional()
  @IsArray()
  roleNames?: string[];
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  userName?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  surname?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  fullName?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  emailAddress?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsIn([0, 1])
  sex?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  managerId?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  positionId?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  branchId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  jobTitle?: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsIn([0, 1, 2])
  @Transform(({ value }) => value === null ? undefined : Number(value))
  type?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(15)
  level?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(15)
  beginLevel?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  salary?: number;

  @IsOptional()
  @IsString()
  @IsDateString()
  salaryAt?: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  allowedLeaveDay?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  @IsDateString()
  startDateAt?: string;

  @IsOptional()
  @IsString()
  @IsDateString()
  endDateAt?: string;

  @IsOptional()
  @IsBoolean()
  isWorkingTimeDefault?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(12)
  morningWorking?: number;

  @IsOptional()
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
    message: 'morningStartAt must be in hh:mm or hh:mm:ss format'
  })
  morningStartAt?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
    message: 'morningEndAt must be in hh:mm or hh:mm:ss format'
  })
  morningEndAt?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(12)
  afternoonWorking?: number;

  @IsOptional()
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
    message: 'afternoonStartAt must be in hh:mm or hh:mm:ss format'
  })
  afternoonStartAt?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
    message: 'afternoonEndAt must be in hh:mm or hh:mm:ss format'
  })
  afternoonEndAt?: string;

  @IsOptional()
  @IsArray()
  roleNames?: string[];

  @IsOptional()
  @IsString()
  avatarPath?: string;

  @IsOptional()
  @IsString()
  avatarFullPath?: string;

  @IsOptional()
  @IsString()
  @IsDateString()
  creationTime?: Date;
}