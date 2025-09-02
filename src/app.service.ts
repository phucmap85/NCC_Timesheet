import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { In } from 'typeorm';
import { RepositoryManager } from 'src/common/repositories';
import { AbpUserConfiguration } from 'src/common/constants/default-config';

@Injectable()
export class AppService {
  constructor(private readonly repositories: RepositoryManager, private readonly jwtService: JwtService) {}
  async getUserConfiguration(req: object): Promise<object | null> {
    try {
      // Verify token
      const token = req['token'];
      if (!token) throw new Error("No token provided");
      await this.jwtService.verifyAsync(token, { secret: process.env.JWT_ACCESS_SECRET });

      // Fetch user
      const user = req['user'];
      if (!user) throw new Error("No user in request");

      // Fetch user roles and permissions
      const userRoles = await this.repositories.userRole.findAll({ where: { userId: user.id } });
    
      const roleIds = userRoles.map(userRole => userRole.roleId);
      
      const rolePermissions = await this.repositories.rolePermission.findAll({ 
        where: { roleId: In(roleIds) }
      });
      
      // Extract unique permission keys from role permissions
      const permissionKeys = [...new Set(rolePermissions.map(rp => rp.permissionKey))];
      
      const permissions: Record<string, boolean> = {};
      permissionKeys.forEach(key => { permissions[key] = true });
      
      return {
        ...AbpUserConfiguration,
        session: {
          ...AbpUserConfiguration.session,
          userId: user.id,
        },
        auth: {
          ...AbpUserConfiguration.auth,
          grantedPermissions: permissions
        }
      };
    } catch (error) {
      return {
        ...AbpUserConfiguration,
        auth: {
          ...AbpUserConfiguration.auth,
          grantedPermissions: {}
        },
      };
    }
  }
}