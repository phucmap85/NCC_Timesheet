import { BadRequestException, Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Role, RolePermission, UserRole } from 'src/entities';
import { BaseService } from 'src/base/base.service';
import { UserService } from 'src/modules/user/user.service';
import { allPermissionsWithConfig, allPermissionsName } from 'src/constant/default_config';
import { RoleDto } from 'src/modules/role/role.dto';

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(UserRole) private userRoleRepository: Repository<UserRole>,
    @InjectRepository(RolePermission) private rolePermissionRepository: Repository<RolePermission>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {
    super(roleRepository, 'role');
  }

  async getAllRoles(
    keyword: string, 
    skipCount: number, 
    maxResultCount: number
  ): Promise<object | null> {
    return this.getAllPaging(
      [], keyword, skipCount, maxResultCount,
      ['name', 'displayName'], 'id', 'ASC'
    );
  }

  async getRoleById(id: number): Promise<object | null> {
    try {
      const role = await this.roleRepository.findOne({ where: { id: id } });

      if (!role) throw new Error(`Role with id ${id} does not exist`);

      return {
        ...role,
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getRoleByName(name: string): Promise<object | null> {
    try {
      const role = await this.roleRepository.findOne({ where: { name: name } });
      
      if (!role) throw new Error(`Role with name ${name} does not exist`);
      
      return {
        ...role,
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getRoleForEdit(id: number): Promise<object | null> {
    try {
      const role = await this.getRoleById(id);
      const rolePermissions = await this.rolePermissionRepository.find({ where: { roleId: id } });
      const userRoles = await this.userRoleRepository.find({ where: { roleId: id } });

      const users = await Promise.all(userRoles.map(async userRole => {
        return await this.userService.getUserById(userRole.userId);
      }));

      return {
        "role": role,
        "permissions": allPermissionsWithConfig,
        "grantedPermissionNames": rolePermissions.map(permission => permission.permissionKey),
        "users": users,
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createRole(role: RoleDto): Promise<object | null> {
    try {
      const existingName = await this.roleRepository.findOne({ where: { name: role.name } });
      const existingDisplayName = await this.roleRepository.findOne({ where: { displayName: role.displayName } });
      
      if (existingName) throw new Error(`Role with name ${role.name} already exists`);
      if (existingDisplayName) throw new Error(`Role with display name ${role.displayName} already exists`);

      return await this.roleRepository.save({
        ...role,
        normalizedName: role.normalizedName || role.name.toUpperCase(),
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateRole(role: RoleDto): Promise<object | null> {
    try {
      if (!role.id) throw new Error('RoleId is required for update');

      const existingRole = await this.getRoleById(role.id) as any;

      if(role.name !== existingRole.name) {
        const existingName = await this.roleRepository.findOne({ where: { name: role.name } });
        if (existingName && existingName.id !== role.id) {
          throw new Error(`Role with name ${role.name} already exists`);
        }
      }

      if(role.displayName !== existingRole.displayName) {
        const existingDisplayName = await this.roleRepository.findOne({ where: { displayName: role.displayName } });
        if (existingDisplayName && existingDisplayName.id !== role.id) {
          throw new Error(`Role with display name ${role.displayName} already exists`);
        }
      }

      return await this.roleRepository.save({
        ...role,
        normalizedName: role.normalizedName || role.name.toUpperCase(),
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async changeRolePermission(editPermissionsAndId: object): Promise<object | null> {
    try {
      const id = editPermissionsAndId['id'];
      const editPermissions = editPermissionsAndId['permissions'];
      
      if (!id || !editPermissions) {
        throw new Error('Id and editPermissions are required');
      }
      
      const newPermissionKeys = Object.values(editPermissions) as string[];
      for (const permissionKey of newPermissionKeys) {
        if (!allPermissionsName.some(permission => permission === permissionKey)) {
          throw new Error(`Permission ${permissionKey} does not exist`);
        }
      }
      
      const existingPermissions = await this.rolePermissionRepository.find({ where: { roleId: id } });
      const existingPermissionKeys = existingPermissions.map(permission => permission.permissionKey);
      
      const permissionsToRemove = existingPermissionKeys.filter(key => !newPermissionKeys.includes(key));
      const permissionsToAdd = newPermissionKeys.filter(key => !existingPermissionKeys.includes(key));
      
      if (permissionsToRemove.length > 0) {
        await this.rolePermissionRepository.delete({
          roleId: id,
          permissionKey: In(permissionsToRemove)
        });
      }

      if (permissionsToAdd.length > 0) {
        const newPermissions = permissionsToAdd.map(permissionKey => {
          const rolePermission = new RolePermission();
          rolePermission.roleId = id;
          rolePermission.permissionKey = permissionKey;
          return rolePermission;
        });
        await this.rolePermissionRepository.save(newPermissions);
      }

      return await this.rolePermissionRepository.find({ where: { roleId: id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteRole(id: number): Promise<object | null> {
    try {
      // Check if the role exists
      await this.getRoleById(id);

      // Check if the role is associated with any users
      const userRoles = await this.userRoleRepository.count({ where: { roleId: id } });
      if (userRoles > 0) {
        throw new Error(`Role with id ${id} is associated with users and cannot be deleted`);
      }

      // Delete associated permissions
      await this.rolePermissionRepository.delete({ roleId: id });

      // Delete the role
      await this.roleRepository.delete(id);

      return null;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
