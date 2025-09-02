import { 
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
  Length,
  IsBoolean,
  IsNumber,
  IsArray,
  IsIn,
  ValidateNested,
  IsDateString,
  IsUrl
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProjectUserDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  userId: number = 0;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsIn([0, 1, 2, 3], {
    message: "Project user type must be 0 (Member), 1 (PM), 2 (Shadow), or 3 (Deactive)"
  })
  type: number;

  @IsNotEmpty()
  @IsBoolean()
  isTemp: boolean;
}

export class ProjectTaskDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  taskId: number = 0;

  @IsNotEmpty()
  @IsBoolean()
  billable: boolean = false;
}

export class ProjectTargetUserDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  userId: number = 0;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  roleName?: string;
}

export class ProjectDto {
  @IsOptional()
  @IsNumber()
  @IsInt()
  id?: number = 0;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  code: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  customerId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsIn([0, 1, 2, 3, 4, 5, 6], {
    message: "Project type must be one of the following values: 0 (T&M), 1 (FixedPrice), 2 (NonBill), 3 (ODC), 4 (Product), 5 (Training), 6 (NoSalary)"
  })
  projectType: number = 1;

  @IsOptional()
  @IsString()
  note?: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  timeStart: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  timeEnd: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsIn([0, 1], { message: 'Project status must be 0 (Active) or 1 (Deactive)' })
  status: number = 0;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsIn([0, 1], { message: 'Notify channel must be 0 (KOMU) or 1 (Mezon)' })
  notifyChannel: number = 0;

  @IsOptional()
  @IsString()
  @IsUrl()
  @Length(0, 500)
  mezonUrl?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  komuChannelId?: string;

  @IsOptional()
  @IsBoolean()
  isNoticeKMSubmitTS?: boolean = false;

  @IsOptional()
  @IsBoolean()
  isNoticeKMRequestOffDate?: boolean = false;

  @IsOptional()
  @IsBoolean()
  isNoticeKMApproveRequestOffDate?: boolean = false;

  @IsOptional()
  @IsBoolean()
  isNoticeKMRequestChangeWorkingTime?: boolean = false;

  @IsOptional()
  @IsBoolean()
  isNoticeKMApproveChangeWorkingTime?: boolean = false;

  @IsNotEmpty()
  @IsBoolean()
  isAllUserBelongTo: boolean = false;

  @IsNotEmpty()
  @IsBoolean()
  isAllowTeamBuilding: boolean = false;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectUserDto)
  users: ProjectUserDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectTaskDto)
  tasks: ProjectTaskDto[] = [];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectTargetUserDto)
  projectTargetUsers?: ProjectTargetUserDto[] = [];
}