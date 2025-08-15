import { 
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
  Length,
  Min,
  Max,
  IsBoolean,
  IsNumber
} from 'class-validator';

export class TaskDto {
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  id?: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(1)
  type: number;

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}