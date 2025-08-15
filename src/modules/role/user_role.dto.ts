import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserRoleDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  userId: number;
  
  @IsNotEmpty()
  @IsString()
  role: string;
}