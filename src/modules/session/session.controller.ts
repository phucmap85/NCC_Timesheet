import { Controller, Get, Headers, HttpCode } from '@nestjs/common';
import { SessionService } from './session.service';
import { Public } from 'src/modules/auth/public.decorator';

@Controller('Session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Public()
  @HttpCode(200)
  @Get('GetCurrentLoginInformations')
  async getCurrentLoginInformations(@Headers() header: object): Promise<object> {
    return this.sessionService.getCurrentLoginInformations(header);
  }
}