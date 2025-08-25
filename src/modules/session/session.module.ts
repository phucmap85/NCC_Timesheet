import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { User } from 'src/common/database/entities';
import { UserRepository } from 'src/common/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [SessionService, UserRepository],
  controllers: [SessionController]
})
export class SessionModule {}
