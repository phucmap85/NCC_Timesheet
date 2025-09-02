import { Module } from '@nestjs/common';
import { TimekeepingService } from './timekeeping.service';
import { TimekeepingController } from './timekeeping.controller';

@Module({
  providers: [TimekeepingService],
  controllers: [TimekeepingController]
})
export class TimekeepingModule {}
