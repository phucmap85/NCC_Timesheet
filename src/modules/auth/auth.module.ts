import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/modules/auth/auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_SECRET
    })
  ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}