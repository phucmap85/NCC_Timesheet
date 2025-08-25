import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { Branch } from 'src/common/database/entities';

@Injectable()
export class BranchRepository extends BaseRepository<Branch> {
  constructor(dataSource: DataSource) {
    super(dataSource, Branch);
  }

  async getBranchById(id: number): Promise<Branch | null> {
    return this.findOne({ where: { id: id } });
  }

  async getBranchByName(name: string): Promise<Branch | null> {
    return this.findOne({ where: { name: name } });
  }

  async getBranchByCode(code: string): Promise<Branch | null> {
    return this.findOne({ where: { code: code } });
  }

  async getBranchByDisplayName(displayName: string): Promise<Branch | null> {
    return this.findOne({ where: { displayName: displayName } });
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