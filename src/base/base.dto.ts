import { 
  IsEnum, 
  IsNotEmpty,
  IsString,
  IsNumber,
  IsInt,
  Min,
  IsOptional,
  IsArray,
  ValidateNested, 
} from 'class-validator';
import { Type } from 'class-transformer';

export enum ComparisonOperation {
  Equals = 0,
  NotEquals = 1,
  GreaterThan = 2,
  LessThan = 3,
  Contains = 4,
}

export class FilterItemDto {
  @IsString()
  @IsNotEmpty()
  propertyName: string;

  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  value: number;

  @IsEnum(ComparisonOperation)
  comparison: ComparisonOperation;
}

export class GetAllPaggingDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilterItemDto)
  filterItems?: FilterItemDto[];

  @IsOptional()
  @IsString()
  searchText?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number) // Automatically transform string query param to number
  skipCount?: number = 0; // Set a default value

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number) // Automatically transform string query param to number
  maxResultCount?: number = 10; // Set a default value
}