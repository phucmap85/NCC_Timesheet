import { Module } from '@nestjs/common';
import { SpecialProjectTaskSettingService } from './special-project-task-setting.service';
import { SpecialProjectTaskSettingController } from './special-project-task-setting.controller';

@Module({
  providers: [SpecialProjectTaskSettingService],
  controllers: [SpecialProjectTaskSettingController]
})
export class SpecialProjectTaskSettingModule {}
