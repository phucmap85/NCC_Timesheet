import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/modules/auth/auth.service';
import { User } from 'src/common/database/entities';
import { UserRepository } from 'src/common/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_SECRET
    }),
  ],
  providers: [AuthService, UserRepository],
  exports: [AuthService],
})
export class AuthModule {}
