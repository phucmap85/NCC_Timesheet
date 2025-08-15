import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot()
  ],
  providers: [SessionService],
  controllers: [SessionController]
})
export class SessionModule {}
