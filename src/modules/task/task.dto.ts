import { 
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
  Length,
  Min,
  IsIn,
  IsBoolean,
  IsNumber
} from 'class-validator';

export class TaskDto {
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  id?: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100, { message: 'Task name must be between 1 and 100 characters' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsIn([0, 1], { message: 'Type of task must be 0 (Common Task) or 1 (Other Task)' })
  type: number;

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}