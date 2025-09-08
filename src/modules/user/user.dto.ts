import { OmitType } from "@nestjs/swagger";
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
  Matches,
  Length
} from "class-validator";

export class UserRoleDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  userId: number;
  
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'Role name must be at most 50 characters' })
  role: string;
}

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  id: number;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(50, { each: true, message: 'Each role name must be at most 50 characters' })
  roleNames: string[];
}

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  userId: number;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100, { message: 'Username must be between 1 and 100 characters' })
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100, { message: 'Name must be between 1 and 100 characters' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100, { message: 'Surname must be between 1 and 100 characters' })
  surname: string;

  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'Full name must be at most 200 characters' })
  fullName?: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 255, { message: 'Email address must be between 1 and 255 characters' })
  emailAddress: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20, { message: 'Phone number must be at most 20 characters' })
  phoneNumber: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Address must be at most 255 characters' })
  address?: string;

  @IsNotEmpty()
  @IsInt()
  @IsIn([0, 1], { message: "Sex must be 0 (Male) or 1 (Female)" })
  sex: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  managerId?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  positionId?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  branchId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'Job title must be at most 50 characters' })
  jobTitle?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsIn([0, 1, 2], { message: "Type of user must be 0 (Staff), 1 (Intership), or 2 (Collaborator)" })
  @Transform(({ value }) => value === null ? undefined : Number(value))
  type: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0, { message: 'Level must be at least 0' })
  @Max(15, { message: 'Level must be at most 15' })
  level?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0, { message: 'Begin level must be at least 0' })
  @Max(15, { message: 'Begin level must be at most 15' })
  beginLevel?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0, { message: 'Salary must be at least 0' })
  salary?: number;

  @IsOptional()
  @IsString()
  @IsDateString()
  salaryAt?: Date;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0, { message: 'Allowed leave days must be at least 0' })
  allowedLeaveDay?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  @IsDateString()
  startDateAt?: Date;

  @IsOptional()
  @IsString()
  @IsDateString()
  endDateAt?: Date;

  @IsOptional()
  @IsBoolean()
  isWorkingTimeDefault?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Morning working hours must be at least 0' })
  @Max(6, { message: 'Morning working hours must be at most 6' })
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
  @Min(0, { message: 'Afternoon working hours must be at least 0' })
  @Max(6, { message: 'Afternoon working hours must be at most 6' })
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

export class UpdateUserDto extends OmitType(CreateUserDto, ['userName', 'password'] as const) {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Username must be at most 100 characters' })
  userName?: string;

  @IsOptional()
  @IsString()
  password?: string;

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