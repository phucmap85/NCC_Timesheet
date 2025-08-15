import { IsNotEmpty, IsOptional, IsString, Length, IsNumber, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllRolesDto {
  @IsOptional()
  @IsString()
  Keyword?: string = '';

  @IsOptional()
  @Type(() => Number)
  SkipCount?: number = 0;

  @IsOptional()
  @Type(() => Number)
  MaxResultCount?: number = 10;
}

export class RoleDto {
  @IsOptional()
  @IsNumber()
  @IsInt()
  id?: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  displayName: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  normalizedName?: string;

  @IsOptional()
  @IsString()
  description?: string;
}