import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RepositoryManager } from 'src/common/repositories';
import { PERMISSIONS_KEY } from 'src/common/decorators/permisson.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly repositories: RepositoryManager
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!permissions || permissions.length === 0) {
      return true; // No permissions required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request['user'];
    if (!user || !user.id) throw new UnauthorizedException("User not found or not authenticated");

    const userRoles = await this.repositories.userRole.getUserRolesByUserId(user.id);
    const rolePermissions = await this.repositories.rolePermission.getPermissionsByRoleIds(userRoles.map(ur => ur.roleId));
    const userPermissionKeys = new Set(rolePermissions.map(rp => rp.permissionKey));

    // Check if user has all required permissions
    const hasAllPermissions = permissions.every(permission => userPermissionKeys.has(permission));
    if (!hasAllPermissions) throw new ForbiddenException("You do not have permission to access this resource");

    return true;
  }
}