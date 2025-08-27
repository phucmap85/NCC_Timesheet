import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { RepositoryManager } from 'src/common/repositories';
import { AbpUserConfiguration } from 'src/common/constants/default-config';

@Injectable()
export class AppService {
  constructor(private readonly repositories: RepositoryManager) {}
  async getUserConfiguration(user: object): Promise<object | null> {
    try {
      const userRoles = await this.repositories.userRole.findAll({ where: { userId: user['id'] }});
    
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
          userId: user['id'],
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