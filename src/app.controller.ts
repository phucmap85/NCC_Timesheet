import { Controller, Get, Post, Body, Request, HttpCode } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { AuthService } from 'src/modules/auth/auth.service';
import { AppService } from 'src/app.service';
import { LoginDto } from 'src/modules/auth/login.dto';
import { Public } from 'src/modules/auth/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly appService: AppService) {}

  @Public()
  @Get('AbpUserConfiguration/GetAll')
  async getUserConfiguration(@Request() req: ExpressRequest): Promise<object | null> {
    return this.appService.getUserConfiguration(req['user']);
  }

  @Public()
  @HttpCode(200)
  @Post('api/TokenAuth/Authenticate')
  async authenticate(@Body() loginDto: LoginDto): Promise<object | null> {
    return this.authService.authenticate(loginDto);
  }
}