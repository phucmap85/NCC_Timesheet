import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('Configuration')
export class ConfigurationController {
  @Public()
  @Get('GetGoogleClientAppId')
  getGoogleClientAppId(): string {
    return process.env.GOOGLE_CLIENT_APP_ID || '';
  }
}
