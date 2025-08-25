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

  async getRolePermissionByRoleAndKey(roleId: number, permissionKey: string): Promise<RolePermission | null> {
    return this.findOne({ where: { roleId, permissionKey } });
  }

  async deletePermissionsByRoleId(roleId: number): Promise<void> {
    await this.withTransaction(async (manager) => {
      await this.deleteWithTransaction({ roleId }, manager);
    });
  }

  async deletePermissionsByKeys(roleId: number, permissionKeys: string[]): Promise<void> {
    await this.withTransaction(async (manager) => {
      await this.deleteWithTransaction({ 
        roleId, 
        permissionKey: In(permissionKeys) 
      }, manager);
    });
  }

  async bulkInsertPermissions(rolePermissions: Partial<RolePermission>[]): Promise<void> {
    await this.withTransaction(async (manager) => {
      await this.saveMultipleWithTransaction(rolePermissions, manager);
    });
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

  async getPermissionKeysForRole(roleId: number): Promise<string[]> {
    const permissions = await this.getPermissionsByRoleId(roleId);
    return permissions.map(p => p.permissionKey);
  }

  async getPermissionKeysForRoles(roleIds: number[]): Promise<string[]> {
    const permissions = await this.getPermissionsByRoleIds(roleIds);
    return [...new Set(permissions.map(p => p.permissionKey))];
  }

  async hasPermission(roleId: number, permissionKey: string): Promise<boolean> {
    return await this.exists({ where: { roleId, permissionKey } });
  }
}