import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { Position } from 'src/common/database/entities';

@Injectable()
export class PositionRepository extends BaseRepository<Position> {
  constructor(dataSource: DataSource) {
    super(dataSource, Position);
  }

  async getPositionById(id: number): Promise<Position | null> {
    return this.findOne({ where: { id: id } });
  }

  async getPositionByName(name: string): Promise<Position | null> {
    return this.findOne({ where: { name: name } });
  }

  async getPositionByShortName(shortName: string): Promise<Position | null> {
    return this.findOne({ where: { shortName: shortName } });
  }

  async getPositionByCode(code: string): Promise<Position | null> {
    return this.findOne({ where: { code: code } });
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