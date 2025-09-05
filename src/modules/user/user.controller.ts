import { 
  Controller,
  Get,
  Post,
  Put,
  Body,
  Query,
  Delete,
  HttpCode,
  Request,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
  BadRequestException,
  ParseFilePipe
} from '@nestjs/common';
import type { Express, Request as ExpressRequest } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserService } from 'src/modules/user/user.service';
import { GetAllPaggingDto } from 'src/common/base/base.dto';
import { 
  UserRoleDto,
  UpdateRoleDto,
  ResetPasswordDto,
  CreateUserDto,
  UpdateUserDto
} from 'src/modules/user/user.dto';
import { Permissions } from 'src/common/constants/enum';
import { HasPermissions } from 'src/common/decorators/permisson.decorator';

@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("GetAllPagging")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Users, Permissions.Admin_Users_View)
  @HttpCode(200)
  async getAllPagging(@Body() getAllPaggingDto: GetAllPaggingDto): Promise<object | null> {
    const {
      filterItems = [], 
      searchText = "", 
      skipCount = 0, 
      maxResultCount = 10
    } = getAllPaggingDto;
    
    return await this.userService.getAllPagging(filterItems, searchText, skipCount, maxResultCount);
  }

  @Get("GetUserNotPagging")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Users, Permissions.Admin_Users_View)
  async getUserNotPagging(): Promise<object | null> {
    return await this.userService.getUserNotPagging();
  }

  @Get("GetAllManager")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Users, Permissions.Admin_Users_View)
  async getAllManager(): Promise<object | null> {
    return await this.userService.getAllManager();
  }

  @Get("Get")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Users, Permissions.Admin_Users_View)
  async getUserById(@Query('Id', ParseIntPipe) id: number): Promise<object | null> {
    return await this.userService.getUserById(id);
  }

  @Get("GetRoles")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Roles, Permissions.Admin_Roles_View)
  async getRoles(): Promise<object | null> {
    return await this.userService.getRoles();
  }

  @Get("GetUserAvatarById")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Users, Permissions.Admin_Users_View)
  async getUserAvatarById(@Query('id', ParseIntPipe) id: number): Promise<object | null> {
    return await this.userService.getUserAvatarById(id);
  }

  @Get("GetUserEmailById")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Users, Permissions.Admin_Users_View)
  async getUserEmailById(@Query('id', ParseIntPipe) id: number): Promise<string | null> {
    return await this.userService.getUserEmailById(id);
  }

  @Post("ChangeUserRole")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Users, Permissions.Admin_Users_EditRole)
  @HttpCode(200)
  async changeUserRole(@Body() userRole: UserRoleDto): Promise<object | null> {
    return await this.userService.changeUserRole(userRole);
  }

  @Put("UpdateRole")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Users, Permissions.Admin_Users_EditRole)
  @HttpCode(200)
  async updateRole(@Body() updateRole: UpdateRoleDto): Promise<object | null> {
    return await this.userService.updateRole(updateRole);
  }

  @Post("UpdateAvatar")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Users, Permissions.Admin_Users_UploadAvatar)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: 'public/avatars',
      filename: (req, file, cb) => {
        const randomName = Math.random().toString(36).substring(2, 15) + Date.now();
        cb(null, `${randomName}${extname(file.originalname)}`);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(bmp|tif|jfif|pjp|png|jpeg|heif|ico|tiff|webp|svg|jpg|heic|gif|pjpeg|avif)$/i)) {
        return cb(new BadRequestException('Only image files are allowed'), false);
      }
      cb(null, true);
    }
  }))
  @HttpCode(200)
  async updateAvatar(
    @Body('userId', ParseIntPipe) id: number,
    @UploadedFile(ParseFilePipe) file: Express.Multer.File
  ): Promise<string | null> {
    return await this.userService.updateAvatar(id, file);
  }

  @Post("UpdateYourOwnAvatar")
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: 'public/avatars',
      filename: (req, file, cb) => {
        const randomName = Math.random().toString(36).substring(2, 15) + Date.now();
        cb(null, `${randomName}${extname(file.originalname)}`);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(bmp|tif|jfif|pjp|png|jpeg|heif|ico|tiff|webp|svg|jpg|heic|gif|pjpeg|avif)$/i)) {
        return cb(new BadRequestException('Only image files are allowed'), false);
      }
      cb(null, true);
    }
  }))
  @HttpCode(200)
  async updateYourOwnAvatar(
    @Request() req: ExpressRequest,
    @UploadedFile(ParseFilePipe) file: Express.Multer.File
  ): Promise<string | null> {
    return await this.userService.updateAvatar(req['user'].id, file);
  }

  @Post("ImportWorkingTimeFromFile")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Users, Permissions.Admin_Users_UploadWorkingTime)
  @UseInterceptors(FileInterceptor('File', {
    storage: diskStorage({
      destination: 'public/working-time',
      filename: (req, file, cb) => {
        const randomName = Math.random().toString(36).substring(2, 15) + Date.now();
        cb(null, `${randomName}${extname(file.originalname)}`);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(xlsx|xls|csv|ods)$/i)) {
        return cb(new BadRequestException('Only spreadsheet files are allowed'), false);
      }
      cb(null, true);
    }
  }))
  @HttpCode(200)
  async importWorkingTimeFromFile(
    @UploadedFile(ParseFilePipe) file: Express.Multer.File
  ): Promise<object | null> {
    return await this.userService.importWorkingTimeFromFile(file);
  }

  @Post("Create")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Users, Permissions.Admin_Users_AddNew)
  @HttpCode(200)
  async createUser(@Body() createUser: CreateUserDto): Promise<object | null> {
    return await this.userService.createUser(createUser);
  }

  @Put("Update")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Users, Permissions.Admin_Users_Edit)
  @HttpCode(200)
  async updateUser(@Body() updateUser: UpdateUserDto): Promise<object | null> {
    return await this.userService.updateUser(updateUser);
  }

  @Post("ResetPassword")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Users, Permissions.Admin_Users_ResetPassword)
  @HttpCode(200)
  async resetPassword(@Body() resetPassword: ResetPasswordDto): Promise<boolean | null> {
    return await this.userService.resetPassword(resetPassword);
  }

  @Post("ActiveUser")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Users, Permissions.Admin_Users_ChangeStatus)
  @HttpCode(200)
  async activeUser(@Body('id', ParseIntPipe) id: number): Promise<object | null> {
    return await this.userService.activeUser(id);
  }

  @Post("DeactiveUser")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Users, Permissions.Admin_Users_ChangeStatus)
  @HttpCode(200)
  async deactiveUser(@Body('id', ParseIntPipe) id: number): Promise<object | null> {
    return await this.userService.deactiveUser(id);
  }

  @Delete("Delete")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Users, Permissions.Admin_Users_Delete)
  async deleteUser(@Query('Id', ParseIntPipe) id: number): Promise<void> {
    return await this.userService.deleteUser(id);
  }
}
