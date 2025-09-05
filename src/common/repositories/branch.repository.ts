import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { Branch } from 'src/common/database/entities';

@Injectable()
export class BranchRepository extends BaseRepository<Branch> {
  constructor(dataSource: DataSource) {
    super(dataSource, Branch);
  }

  commonQuery() {
    return this.createQueryBuilder("branch")
      .leftJoinAndSelect("branch.users", "users");
  }

  async getBranchById(id: number): Promise<Branch | null> {
    return await this.commonQuery().where("branch.id = :id", { id }).getOne();
  }

  async getBranchByName(name: string): Promise<Branch | null> {
    return await this.commonQuery().where("branch.name = :name", { name }).getOne();
  }

  async getBranchByCode(code: string): Promise<Branch | null> {
    return await this.commonQuery().where("branch.code = :code", { code }).getOne();
  }

  async getBranchByDisplayName(displayName: string): Promise<Branch | null> {
    return await this.commonQuery().where("branch.displayName = :displayName", { displayName }).getOne();
  }

  async saveBranch(branch: Partial<Branch>): Promise<Branch> {
    return await this.withTransaction(async (manager) => {
      return await this.saveWithTransaction(branch, manager);
    });
  }

  async removeBranch(branch: Branch): Promise<void> {
    await this.withTransaction(async (manager) => {
      return await this.removeWithTransaction(branch, manager);
    });
  }
}