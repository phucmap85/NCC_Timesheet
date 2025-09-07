import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { RepositoryManager } from 'src/common/repositories';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly repositories: RepositoryManager,
    private readonly jwtService: JwtService, 
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = request['token'];
    if (!token) throw new UnauthorizedException("No token provided");

    try {
      await this.jwtService.verifyAsync(token, { secret: process.env.JWT_ACCESS_SECRET });
    } catch {
      throw new UnauthorizedException("Invalid token");
    }

    const user = await this.repositories.user.getUserById(request['user'].id);
    if (!user) throw new UnauthorizedException("User not found");
    if (user.isActive === false) throw new UnauthorizedException("User is inactive");

    return true;
  }
}