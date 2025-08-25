import { BadRequestException, Injectable } from '@nestjs/common';
import { Role, RolePermission } from 'src/common/database/entities';
import { allPermissionsWithConfig, allPermissionsName } from 'src/common/constants/default_config';
import { RoleDto } from 'src/modules/role/role.dto';
import { RepositoryManager } from 'src/common/repositories';

@Injectable()
export class RoleService {
  constructor(private readonly repositories: RepositoryManager) {}

  async getAllRoles(
    keyword: string, 
    skipCount: number, 
    maxResultCount: number
  ): Promise<{ totalCount: number; items: Role[] }> {
    return this.repositories.role.getAllPaging(
      [], keyword, skipCount, maxResultCount,
      ['name', 'displayName'], 'id', 'ASC'
    );
  }

  async getRoleForEdit(id: number): Promise<{
    role: Role;
    permissions: any;
    grantedPermissionNames: string[];
    users: any[];
  }> {
    try {
      const role = await this.repositories.role.findById(id);
      if (!role) {
        throw new Error(`Role with id ${id} does not exist`);
      }

      const rolePermissions = await this.repositories.rolePermission.getPermissionsByRoleId(id);
      const userRoles = await this.repositories.userRole.getUsersWithRoleDetails(id);

      const users = await Promise.all(
        userRoles.map(async userRole => {
          return await this.repositories.user.findById(userRole.userId);
        })
      );

      return {
        role: role,
        permissions: allPermissionsWithConfig,
        grantedPermissionNames: rolePermissions.map(permission => permission.permissionKey),
        users: users
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createRole(roleDto: RoleDto): Promise<Role> {
    try {
      const { nameExists, displayNameExists } = await this.repositories.role.checkRoleExists(
        roleDto.name,
        roleDto.displayName
      );
      
      if (nameExists) throw new Error(`Role with name ${roleDto.name} already exists`);
      
      if (displayNameExists) {
        throw new Error(`Role with display name ${roleDto.displayName} already exists`);
      }

      const roleData = {
        ...roleDto,
        normalizedName: roleDto.normalizedName || roleDto.name.toUpperCase()
      };

      return await this.repositories.role.saveRole(roleData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateRole(roleDto: RoleDto): Promise<Role> {
    try {
      if (!roleDto.id) throw new Error('RoleId is required for update');

      const existingRole = await this.repositories.role.findById(roleDto.id);
      if (!existingRole) throw new Error(`Role with id ${roleDto.id} does not exist`);

      // Check for name conflicts (excluding current role)
      if (roleDto.name !== existingRole.name || roleDto.displayName !== existingRole.displayName) {
        const { nameExists, displayNameExists } = await this.repositories.role.checkRoleExists(
          roleDto.name,
          roleDto.displayName,
          roleDto.id
        );

        if (nameExists) throw new Error(`Role with name ${roleDto.name} already exists`);

        if (displayNameExists) {
          throw new Error(`Role with display name ${roleDto.displayName} already exists`);
        }
      }

      const roleData = {
        ...roleDto,
        normalizedName: roleDto.normalizedName || roleDto.name.toUpperCase()
      };

      return await this.repositories.role.saveRole(roleData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async changeRolePermission(
    id: number,
    newPermissionKeys: string[]
  ): Promise<RolePermission[]> {
    try {  
      if (!id || !newPermissionKeys) throw new Error('Id and permissions are required');
      
      // Validate all permission keys exist
      for (const permissionKey of newPermissionKeys) {
        if (!allPermissionsName.includes(permissionKey)) {
          throw new Error(`Permission ${permissionKey} does not exist`);
        }
      }
      
      // Update permissions using repository method
      return await this.repositories.rolePermission.updateRolePermissions(id, newPermissionKeys);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteRole(id: number): Promise<void> {
    try {
      // Check if the role exists
      const role = await this.repositories.role.findById(id);
      if (!role) throw new Error(`Role with id ${id} does not exist`);

      // Check if the role is associated with any users
      const userCount = await this.repositories.userRole.countUsersByRoleId(id);
      if (userCount > 0) {
        throw new Error(`Role with id ${id} is associated with ${userCount} users and cannot be deleted`);
      }

      // Delete the role
      return await this.repositories.role.deleteRoleById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
