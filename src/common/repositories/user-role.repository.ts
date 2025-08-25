import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { UserRole } from 'src/common/database/entities';

@Injectable()
export class UserRoleRepository extends BaseRepository<UserRole> {
  constructor(dataSource: DataSource) {
    super(dataSource, UserRole);
  }

  async getUserRolesByUserId(userId: number): Promise<UserRole[]> {
    return this.createQueryBuilder("userRole")
      .leftJoinAndSelect("userRole.role", "role")
      .where("userRole.userId = :userId", { userId })
      .getMany();
  }

  async getUserRolesByRoleId(roleId: number): Promise<UserRole[]> {
    return this.createQueryBuilder("userRole")
      .leftJoinAndSelect("userRole.user", "user")
      .where("userRole.roleId = :roleId", { roleId })
      .getMany();
  }

  async getUserRoleByUserAndRole(userId: number, roleId: number): Promise<UserRole | null> {
    return this.findOne({ where: { userId, roleId } });
  }

  async getRoleIdsByUserId(userId: number): Promise<number[]> {
    const userRoles = await this.findAll({ where: { userId } });
    return userRoles.map(ur => ur.roleId);
  }

  async getUserIdsByRoleId(roleId: number): Promise<number[]> {
    const userRoles = await this.findAll({ where: { roleId } });
    return userRoles.map(ur => ur.userId);
  }

  async getUserIdsByRoleIds(roleIds: number[]): Promise<number[]> {
    const userRoles = await this.findAll({ where: { roleId: In(roleIds) } });
    return [...new Set(userRoles.map(ur => ur.userId))];
  }

  async deleteUserRolesByUserId(userId: number): Promise<void> {
    await this.withTransaction(async (manager) => {
      await this.deleteWithTransaction({ userId }, manager);
    });
  }

  async deleteUserRolesByRoleId(roleId: number): Promise<void> {
    await this.withTransaction(async (manager) => {
      await this.deleteWithTransaction({ roleId }, manager);
    });
  }

  async deleteUserRole(userId: number, roleId: number): Promise<void> {
    await this.withTransaction(async (manager) => {
      await this.deleteWithTransaction({ userId, roleId }, manager);
    });
  }

  async updateUserRoles(userId: number, roleIds: number[]): Promise<UserRole[]> {
    return await this.withTransaction(async (manager) => {
      // Get existing user roles
      const existingUserRoles = await this.findWithTransaction({ where: { userId } }, manager);
      const existingRoleIds = existingUserRoles.map(ur => ur.roleId);

      // Find roles to remove and add
      const roleIdsToRemove = existingRoleIds.filter(id => !roleIds.includes(id));
      const roleIdsToAdd = roleIds.filter(id => !existingRoleIds.includes(id));

      // Remove obsolete user roles
      if (roleIdsToRemove.length > 0) {
        await this.deleteWithTransaction({ 
          userId, 
          roleId: In(roleIdsToRemove) 
        }, manager);
      }

      // Add new user roles
      if (roleIdsToAdd.length > 0) {
        const newUserRoles = roleIdsToAdd.map(roleId => ({ userId, roleId }));
        await this.saveMultipleWithTransaction(newUserRoles, manager);
      }

      // Return updated user roles
      return await this.findWithTransaction({ where: { userId } }, manager);
    });
  }

  async bulkAssignRoleToUsers(roleId: number, userIds: number[]): Promise<UserRole[]> {
    return await this.withTransaction(async (manager) => {
      // Get existing assignments
      const existingUserRoles = await this.findWithTransaction({ 
        where: { roleId, userId: In(userIds) } 
      }, manager);
      const existingUserIds = existingUserRoles.map(ur => ur.userId);

      // Find users to assign
      const userIdsToAssign = userIds.filter(id => !existingUserIds.includes(id));

      if (userIdsToAssign.length > 0) {
        const newUserRoles = userIdsToAssign.map(userId => ({ userId, roleId }));
        await this.saveMultipleWithTransaction(newUserRoles, manager);
      }

      // Return all user roles for this role
      return await this.findWithTransaction({ where: { roleId } }, manager);
    });
  }

  async countUsersByRoleId(roleId: number): Promise<number> {
    return this.count({ where: { roleId } });
  }

  async countRolesByUserId(userId: number): Promise<number> {
    return this.count({ where: { userId } });
  }

  async hasUserRole(userId: number, roleId: number): Promise<boolean> {
    return await this.exists({ where: { userId, roleId } });
  }

  async getUsersWithRoleDetails(roleId: number): Promise<UserRole[]> {
    return this.createQueryBuilder("userRole")
      .leftJoinAndSelect("userRole.user", "user")
      .leftJoinAndSelect("userRole.role", "role")
      .where("userRole.roleId = :roleId", { roleId })
      .getMany();
  }
}