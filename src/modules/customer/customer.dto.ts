import { 
  IsInt, 
  IsString, 
  IsNotEmpty, 
  IsOptional, 
  Length, 
  IsNumber, 
  Min, 
  Matches, 
  MaxLength
} from 'class-validator';

export class CustomerDto {
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  id?: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100, { message: 'Name must be between 1 and 100 characters' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50, { message: 'Code must be between 1 and 50 characters' })
  @Matches(/^[A-Za-z0-9_-]+$/, { message: 'Code can only contain letters, numbers, underscores, and hyphens' })
  code: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Address must be at most 255 characters' })
  address?: string;
}