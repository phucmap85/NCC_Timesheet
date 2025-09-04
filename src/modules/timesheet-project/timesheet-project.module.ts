import { Module } from '@nestjs/common';
import { TimesheetProjectService } from './timesheet-project.service';
import { TimesheetProjectController } from './timesheet-project.controller';

@Module({
  controllers: [TimesheetProjectController],
  providers: [TimesheetProjectService]
})
export class TimesheetProjectModule {}