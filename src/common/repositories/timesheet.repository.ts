import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { Timesheet } from 'src/common/database/entities';

@Injectable()
export class TimesheetRepository extends BaseRepository<Timesheet> {
  constructor(dataSource: DataSource) {
    super(dataSource, Timesheet);
  }
}