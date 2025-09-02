import { Controller, Get } from '@nestjs/common';

@Controller('SpecialProjectTaskSetting')
export class SpecialProjectTaskSettingController {
  // Implement later
  @Get("Get")
  async getSpecialProjectTaskSetting(): Promise<any> {
    return {projectTaskId: "0"};
  }
}
