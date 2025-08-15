import { 
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
  Length,
  Min,
  Max,
  IsBoolean,
  IsNumber,
  IsArray,
  ValidateNested,
  IsDateString,
  IsUrl
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProjectUserDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(4)
  type: number;

  @IsNotEmpty()
  @IsBoolean()
  isTemp: boolean;
}

export class ProjectTaskDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  taskId: number;

  @IsNotEmpty()
  @IsBoolean()
  billable: boolean;
}

export class ProjectTargetUserDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  roleName: number;
}

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  code: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  customerId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(4)
  projectType: number;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsDateString()
  timeStart?: string;

  @IsOptional()
  @IsDateString()
  timeEnd?: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(1)
  status?: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(2)
  notifyChannel: number;

  @IsOptional()
  @IsString()
  @IsUrl()
  @Length(0, 500)
  mezonUrl?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  komuChannelId?: string;

  @IsNotEmpty()
  @IsBoolean()
  isNoticeKMSubmitTS: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isNoticeKMRequestOffDate: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isNoticeKMApproveRequestOffDate: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isNoticeKMRequestChangeWorkingTime: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isNoticeKMApproveChangeWorkingTime: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isAllUserBelongTo: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isAllowTeamBuilding: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectUserDto)
  users: ProjectUserDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectTaskDto)
  tasks: ProjectTaskDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectTargetUserDto)
  projectTargetUsers?: ProjectTargetUserDto[];
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  @Length(1, 255)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  code?: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1)
  customerId?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(4)
  projectType?: number;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsDateString()
  timeStart?: string;

  @IsOptional()
  @IsDateString()
  timeEnd?: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(1)
  status?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(2)
  notifyChannel?: number;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  mezonUrl?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  komuChannelId?: string;

  @IsOptional()
  @IsBoolean()
  isNoticeKMSubmitTS?: boolean;

  @IsOptional()
  @IsBoolean()
  isNoticeKMRequestOffDate?: boolean;

  @IsOptional()
  @IsBoolean()
  isNoticeKMApproveRequestOffDate?: boolean;

  @IsOptional()
  @IsBoolean()
  isNoticeKMRequestChangeWorkingTime?: boolean;

  @IsOptional()
  @IsBoolean()
  isNoticeKMApproveChangeWorkingTime?: boolean;

  @IsOptional()
  @IsBoolean()
  isAllUserBelongTo?: boolean;

  @IsOptional()
  @IsBoolean()
  isAllowTeamBuilding?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectUserDto)
  users?: ProjectUserDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectTaskDto)
  tasks?: ProjectTaskDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectTargetUserDto)
  projectTargetUsers?: ProjectTargetUserDto[];
}

export class ProjectDto extends CreateProjectDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  id: number;

  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @IsOptional()
  @IsDateString()
  updatedAt?: string;

  @IsOptional()
  @IsDateString()
  deletedAt?: string;
}