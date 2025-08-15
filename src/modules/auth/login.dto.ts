import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  userNameOrEmailAddress: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsBoolean()
  @IsNotEmpty()
  rememberClient: boolean;
}