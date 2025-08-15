import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { GetAllPaggingDto } from 'src/base/base.dto';
import { UserRoleDto } from 'src/modules/role/user_role.dto';

@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("GetAllPagging")
  async getAllPagging(@Body() getAllPaggingDto: GetAllPaggingDto): Promise<object | null> {
    const {
      filterItems = [], 
      searchText = "", 
      skipCount = 0, 
      maxResultCount = 10
    } = getAllPaggingDto;
    
    return this.userService.getAllPagging(filterItems, searchText, skipCount, maxResultCount);
  }

  @Get("GetUserNotPagging")
  async getUserNotPagging(): Promise<object | null> {
    return this.userService.getUserNotPagging();
  }

  @Get("GetAllManager")
  async getAllManager(): Promise<object | null> {
    return this.userService.getAllManager();
  }

  @Post("ChangeUserRole")
  @HttpCode(200)
  async changeUserRole(@Body() userRole: UserRoleDto): Promise<object | null> {
    return this.userService.changeUserRole(userRole);
  }
}
