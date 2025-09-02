import { Module } from '@nestjs/common';
import { NormalWorkingHourController } from './normal-working-hour.controller';
import { NormalWorkingHourService } from './normal-working-hour.service';

@Module({
  providers: [NormalWorkingHourService],
  controllers: [NormalWorkingHourController]
})
export class NormalWorkingHourModule {}