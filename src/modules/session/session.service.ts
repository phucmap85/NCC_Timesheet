import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RepositoryManager } from 'src/common/repositories';

@Injectable()
export class SessionService {
  constructor(private jwtService: JwtService, private readonly repositories: RepositoryManager) {}

  async getCurrentLoginInformations(header: object): Promise<object> {
    let response: object = {
      "application": {
        "version": '4.3.0.0',
        "releaseDate": new Date().toISOString(),
        "features": {}
      },
      "user": null,
      "tenant": null
    };

    let userData = null;

    // Check if the Authorization header is present
    const token = header['authorization']?.split(' ')[1];
    if (token) {
      try {
        const payload = await this.jwtService.verifyAsync(
          token, { secret: process.env.JWT_ACCESS_SECRET }
        );
        if (!payload) throw new Error("Invalid token");

        const user = await this.repositories.user.getUserByUsernameOrEmail(payload.userName);
        if (!user) throw new Error("User not found");
        if (user.isActive === false) throw new Error("User is inactive");

        userData = Object.assign({
          ...user,
          password: undefined
        });
      } catch(error) {
        throw new BadRequestException(error.message);
      }
    }
    
    return {
      ...response,
      "user": userData
    }
  }
}
