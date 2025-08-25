import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { User } from 'src/common/database/entities';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(dataSource: DataSource) {
    super(dataSource, User);
  }

  async getUserById(id: number): Promise<User | null> {
    return this.findOne({ where: { id: id } });
  }

  async getUserByEmail(emailAddress: string): Promise<User | null> {
    return this.findOne({ where: { emailAddress: emailAddress } });
  }

  async getUserByUsername(userName: string): Promise<User | null> {
    return this.findOne({ where: { userName: userName } });
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.findOne({ where: { phoneNumber: phoneNumber } });
  }

  async getUserByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
    if ((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(usernameOrEmail)) {
      return this.getUserByEmail(usernameOrEmail);
    }
    return this.getUserByUsername(usernameOrEmail);
  }

  async saveUser(user: Partial<User>): Promise<User> {
    return await this.withTransaction(async (manager) => {
      return await this.saveWithTransaction(user, manager);
    });
  }

  async removeUser(user: User): Promise<void> {
    await this.withTransaction(async (manager) => {
      return await this.removeWithTransaction(user, manager);
    });
  }

  async getAllUsersWithDetails(): Promise<User[]> {
    return this.createQueryBuilder("user")
      .leftJoinAndSelect("user.position", "position")
      .leftJoinAndSelect("user.branch", "branch")
      .leftJoinAndSelect("user.manager", "manager")
      .leftJoinAndSelect("user.userRoles", "userRoles")
      .leftJoinAndSelect("userRoles.role", "role")
      .leftJoinAndSelect("user.projectUsers", "projectUsers")
      .leftJoinAndSelect("projectUsers.project", "project")
      .getMany();
  }

  async getUsersByManagerId(managerId: number): Promise<User[]> {
    return this.findAll({ where: { managerId: managerId } });
  }

  async getUsersByBranchId(branchId: number): Promise<User[]> {
    return this.findAll({ where: { branchId: branchId } });
  }

  async getUsersByPositionId(positionId: number): Promise<User[]> {
    return this.findAll({ where: { positionId: positionId } });
  }

  async getActiveUsers(): Promise<User[]> {
    return this.findAll({ where: { isActive: true } });
  }

  async getInactiveUsers(): Promise<User[]> {
    return this.findAll({ where: { isActive: false } });
  }
}