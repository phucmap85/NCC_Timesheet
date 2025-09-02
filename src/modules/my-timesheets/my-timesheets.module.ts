import { Module } from '@nestjs/common';
import { MyTimesheetsService } from './my-timesheets.service';
import { MyTimesheetsController } from './my-timesheets.controller';

@Module({
  controllers: [MyTimesheetsController],
  providers: [MyTimesheetsService]
})
export class MyTimesheetsModule {}