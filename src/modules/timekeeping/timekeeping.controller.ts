import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';

@Controller('Timekeeping')
export class TimekeepingController {
  @Get("GetMyDetails")
  async getMyDetails(
    @Query('year', ParseIntPipe) year: number,
    @Query('month', ParseIntPipe) month: number,
  ): Promise<any> {
    return null;
  }
}
