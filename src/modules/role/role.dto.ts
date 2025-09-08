import { IsNotEmpty, IsOptional, IsString, Length, IsNumber, IsInt, Min, MaxLength } from 'class-validator';
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
  @Min(0)
  id?: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50, { message: 'Role name must be between 1 and 50 characters' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100, { message: 'Role display name must be between 1 and 100 characters' })
  displayName: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Normalized name must be at most 100 characters' })
  normalizedName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Description must be at most 255 characters' })
  description?: string;
}