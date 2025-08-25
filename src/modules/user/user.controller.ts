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
  ParseFilePipe,
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

@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("GetAllPagging")
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
  async getUserNotPagging(): Promise<object | null> {
    return await this.userService.getUserNotPagging();
  }

  @Get("GetAllManager")
  async getAllManager(): Promise<object | null> {
    return await this.userService.getAllManager();
  }

  @Get("Get")
  async getUserById(@Query('Id', ParseIntPipe) id: number): Promise<object | null> {
    return await this.userService.getUserById(id);
  }

  @Get("GetRoles")
  async getRoles(): Promise<object | null> {
    return await this.userService.getRoles();
  }

  @Get("GetUserAvatarById")
  async getUserAvatarById(@Query('id', ParseIntPipe) id: number): Promise<object | null> {
    return await this.userService.getUserAvatarById(id);
  }

  @Get("GetUserEmailById")
  async getUserEmailById(@Query('id', ParseIntPipe) id: number): Promise<string | null> {
    return await this.userService.getUserEmailById(id);
  }

  @Post("ChangeUserRole")
  @HttpCode(200)
  async changeUserRole(@Body() userRole: UserRoleDto): Promise<object | null> {
    return await this.userService.changeUserRole(userRole);
  }

  @Put("UpdateRole")
  @HttpCode(200)
  async updateRole(@Body() updateRole: UpdateRoleDto): Promise<object | null> {
    return await this.userService.updateRole(updateRole);
  }

  @Post("UpdateAvatar")
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: 'public/avatars',
      filename: (req, file, cb) => {
        const randomName = Math.random().toString(36).substring(2, 15) + Date.now();
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
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
      },
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
  @UseInterceptors(FileInterceptor('File', {
    storage: diskStorage({
      destination: 'public/working-time',
      filename: (req, file, cb) => {
        const randomName = Math.random().toString(36).substring(2, 15) + Date.now();
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
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
  @HttpCode(200)
  async createUser(@Body() createUser: CreateUserDto): Promise<object | null> {
    return await this.userService.createUser(createUser);
  }

  @Put("Update")
  @HttpCode(200)
  async updateUser(@Body() updateUser: UpdateUserDto): Promise<object | null> {
    return await this.userService.updateUser(updateUser);
  }

  @Post("ResetPassword")
  @HttpCode(200)
  async resetPassword(@Body() resetPassword: ResetPasswordDto): Promise<boolean | null> {
    return await this.userService.resetPassword(resetPassword);
  }

  @Post("ActiveUser")
  @HttpCode(200)
  async activeUser(@Body('id', ParseIntPipe) id: number): Promise<object | null> {
    return await this.userService.activeUser(id);
  }

  @Post("DeactiveUser")
  @HttpCode(200)
  async deactiveUser(@Body('id', ParseIntPipe) id: number): Promise<object | null> {
    return await this.userService.deactiveUser(id);
  }

  @Delete("Delete")
  async deleteUser(@Query('Id', ParseIntPipe) id: number): Promise<void> {
    return await this.userService.deleteUser(id);
  }
}
