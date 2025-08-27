import { Controller, Get, Headers, HttpCode } from '@nestjs/common';
import { SessionService } from 'src/modules/session/session.service';
import { Public } from 'src/common/decorators/public.decorator';

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