import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { Position } from 'src/common/database/entities';

@Injectable()
export class PositionRepository extends BaseRepository<Position> {
  constructor(dataSource: DataSource) {
    super(dataSource, Position);
  }

  commonQuery() {
    return this.createQueryBuilder("position").leftJoinAndSelect("position.users", "users");
  }

  async getPositionById(id: number): Promise<Position | null> {
    return await this.commonQuery().where("position.id = :id", { id }).getOne();
  }

  async getPositionByName(name: string): Promise<Position | null> {
    return await this.commonQuery().where("position.name = :name", { name }).getOne();
  }

  async getPositionByShortName(shortName: string): Promise<Position | null> {
    return await this.commonQuery().where("position.shortName = :shortName", { shortName }).getOne();
  }

  async getPositionByCode(code: string): Promise<Position | null> {
    return await this.commonQuery().where("position.code = :code", { code }).getOne();
  }

  async savePosition(position: Partial<Position>): Promise<Position> {
    return await this.withTransaction(async (manager) => {
      return await this.saveWithTransaction(position, manager);
    });
  }

  async removePosition(position: Position): Promise<void> {
    await this.withTransaction(async (manager) => {
      return await this.removeWithTransaction(position, manager);
    });
  }
}