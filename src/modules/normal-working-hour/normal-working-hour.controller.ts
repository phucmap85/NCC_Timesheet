import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';

@Controller('NormalWorkingHour')
export class NormalWorkingHourController {
  // Implement later
  @Get("GetNormalWorkingHourByUserLogin")
  async getNormalWorkingHourByUserLogin(
    @Query('year', ParseIntPipe) year: number,
    @Query('month', ParseIntPipe) month: number,
    @Query('status', ParseIntPipe) status: number,
  ) : Promise<any> {
    return null;
  }
}
