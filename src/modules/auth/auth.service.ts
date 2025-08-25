import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/modules/auth/login.dto';
import { UserRepository } from 'src/common/repositories';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService) {}

  async authenticate(loginDto: LoginDto): Promise<object | null> {
    try {
      const user = await this.userRepository.getUserByUsernameOrEmail(loginDto.userNameOrEmailAddress);
      if (!user) throw new Error('Invalid username/email or password');

      const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
      if (!isPasswordValid) throw new Error('Invalid username/email or password');

      const payload = {
        ...user,
        "branch": 0,
        "password": undefined, // Exclude password from the payload
      };
      
      const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: loginDto.rememberClient ? '7d' : '30d'
      });
      const encryptedAccessToken = Buffer.from(accessToken).toString('base64');

      return {
        accessToken: accessToken,
        encryptedAccessToken: encryptedAccessToken,
        expireInSeconds: loginDto.rememberClient ? 604800 : 2592000,
        userId: user.id
      };
    }
    catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
