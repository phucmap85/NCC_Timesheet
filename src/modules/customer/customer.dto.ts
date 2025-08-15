import { IsInt, IsString, IsNotEmpty, IsOptional, Length, IsNumber, Min } from 'class-validator';

export class CustomerDto {
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  id?: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  code: string;

  @IsString()
  @IsOptional()
  @Length(0, 255)
  address?: string;
}