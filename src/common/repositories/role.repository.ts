import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { Role } from 'src/common/database/entities';

@Injectable()
export class RoleRepository extends BaseRepository<Role> {
  constructor(dataSource: DataSource) {
    super(dataSource, Role);
  }

  async getRoleById(id: number): Promise<Role | null> {
    return this.createQueryBuilder("role")
      .leftJoinAndSelect("role.rolePermissions", "rolePermissions")
      .leftJoinAndSelect("role.userRoles", "userRoles")
      .leftJoinAndSelect("userRoles.user", "user")
      .where("role.id = :id", { id })
      .getOne();
  }

  async getRoleByName(name: string): Promise<Role | null> {
    return this.findOne({ where: { name } });
  }

  async getRoleByDisplayName(displayName: string): Promise<Role | null> {
    return this.findOne({ where: { displayName } });
  }

  async getRoleByNormalizedName(normalizedName: string): Promise<Role | null> {
    return this.findOne({ where: { normalizedName } });
  }

  async getAllRolesWithRelations(): Promise<Role[]> {
    return this.createQueryBuilder("role")
      .leftJoinAndSelect("role.rolePermissions", "rolePermissions")
      .leftJoinAndSelect("role.userRoles", "userRoles")
      .leftJoinAndSelect("userRoles.user", "user")
      .getMany();
  }

  async checkRoleExists(name: string, displayName: string, excludeId?: number): Promise<{ nameExists: boolean; displayNameExists: boolean }> {
    const nameQuery = this.createQueryBuilder("role").where("role.name = :name", { name });
    const displayNameQuery = this.createQueryBuilder("role").where("role.displayName = :displayName", { displayName });

    if (excludeId) {
      nameQuery.andWhere("role.id != :excludeId", { excludeId });
      displayNameQuery.andWhere("role.id != :excludeId", { excludeId });
    }

    const [nameCount, displayNameCount] = await Promise.all([
      nameQuery.getCount(),
      displayNameQuery.getCount()
    ]);

    return { 
      nameExists: nameCount > 0, 
      displayNameExists: displayNameCount > 0 
    };
  }

  async saveRole(role: Partial<Role>): Promise<Role> {
    return await this.withTransaction(async (manager) => {
      return await this.saveWithTransaction(role, manager);
    });
  }

  async deleteRoleById(id: number): Promise<void> {
    await this.withTransaction(async (manager) => {
      await this.deleteWithTransaction({ id }, manager);
    });
  }

  async countUsersByRoleId(roleId: number): Promise<number> {
    return this.createQueryBuilder("role")
      .leftJoin("role.userRoles", "userRoles")
      .where("role.id = :roleId", { roleId })
      .getCount();
  }
}