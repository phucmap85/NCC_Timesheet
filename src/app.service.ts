import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UserRole, RolePermission } from 'src/common/database/entities';
import { AbpUserConfiguration } from 'src/common/constants/default_config';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserRole) private userRoleRepository: Repository<UserRole>,
    @InjectRepository(RolePermission) private rolePermissionRepository: Repository<RolePermission>,
  ) {}
  async getUserConfiguration(user: object): Promise<object | null> {
    try {
      const userRoles = await this.userRoleRepository.find({ where: { userId: user['id'] }});
    
      const roleIds = userRoles.map(userRole => userRole.roleId);
      
      const rolePermissions = await this.rolePermissionRepository.find({ 
        where: { roleId: In(roleIds) }
      });
      
      // Extract unique permission keys from role permissions
      const permissionKeys = [...new Set(rolePermissions.map(rp => rp.permissionKey))];
      
      const permissions = {};
      permissionKeys.forEach(key => {
        permissions[key] = true;
      });
      
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