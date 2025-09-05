import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { RolePermission } from 'src/common/database/entities';

@Injectable()
export class RolePermissionRepository extends BaseRepository<RolePermission> {
  constructor(dataSource: DataSource) {
    super(dataSource, RolePermission);
  }

  async getPermissionsByRoleId(roleId: number): Promise<RolePermission[]> {
    return this.findAll({ where: { roleId } });
  }

  async getPermissionsByRoleIds(roleIds: number[]): Promise<RolePermission[]> {
    return this.findAll({ where: { roleId: In(roleIds) } });
  }

  async updateRolePermissions(roleId: number, newPermissionKeys: string[]): Promise<RolePermission[]> {
    return await this.withTransaction(async (manager) => {
      // Get existing permissions
      const existingPermissions = await this.findWithTransaction({ where: { roleId } }, manager);
      const existingKeys = existingPermissions.map(p => p.permissionKey);

      // Find permissions to remove and add
      const keysToRemove = existingKeys.filter(key => !newPermissionKeys.includes(key));
      const keysToAdd = newPermissionKeys.filter(key => !existingKeys.includes(key));

      // Remove obsolete permissions
      if (keysToRemove.length > 0) {
        await this.deleteWithTransaction({ 
          roleId, 
          permissionKey: In(keysToRemove) 
        }, manager);
      }

      // Add new permissions
      if (keysToAdd.length > 0) {
        const newPermissions = keysToAdd.map(permissionKey => ({
          roleId,
          permissionKey
        }));
        await this.saveMultipleWithTransaction(newPermissions, manager);
      }

      // Return updated permissions
      return await this.findWithTransaction({ where: { roleId } }, manager);
    });
  }
}