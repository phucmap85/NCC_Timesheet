import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { Timesheet } from 'src/common/database/entities';

@Injectable()
export class TimesheetRepository extends BaseRepository<Timesheet> {
  constructor(dataSource: DataSource) {
    super(dataSource, Timesheet);
  }

  commonQuery() {
    return this.createQueryBuilder('timesheet')
    .leftJoinAndSelect('timesheet.user', 'user')
    .leftJoinAndSelect('timesheet.projectTask', 'projectTask')
    .leftJoinAndSelect('timesheet.approver', 'approver')
    .leftJoinAndSelect('timesheet.targetTimesheet', 'targetTimesheet')
    .leftJoinAndSelect('timesheet.shadowTimesheets', 'shadowTimesheets');
  }

  async findByUserId(userId: number): Promise<Timesheet[]> {
    return this.commonQuery()
      .where('timesheet.userId = :userId', { userId })
      .getMany();
  }

  async findByUserIdAndDateRange(userId: number, startDate: Date, endDate: Date): Promise<Timesheet[]> {
    return this.commonQuery()
      .where('timesheet.userId = :userId', { userId })
      .andWhere('timesheet.dateAt BETWEEN :startDate AND :endDate', { startDate, endDate })
      .getMany();
  }

  async findByUserIdAndStatus(userId: number, status: number): Promise<Timesheet[]> {
    return this.commonQuery()
      .where('timesheet.userId = :userId', { userId })
      .andWhere('timesheet.status = :status', { status })
      .getMany();
  }

  async findByUserIdAndTypeOfWork(userId: number, typeOfWork: number): Promise<Timesheet[]> {
    return this.commonQuery()
      .where('timesheet.userId = :userId', { userId })
      .andWhere('timesheet.typeOfWork = :typeOfWork', { typeOfWork })
      .getMany();
  }

  async findByTimesheetId(timesheetId: number): Promise<Timesheet | null> {
    return this.commonQuery()
      .where('timesheet.id = :timesheetId', { timesheetId })
      .getOne();
  }

  async saveTimesheet(timesheet: Partial<Timesheet>): Promise<Timesheet> {
    return await this.withTransaction(async (manager) => {
      return await this.saveWithTransaction(timesheet, manager);
    });
  }

  async removeTimesheet(timesheet: Timesheet): Promise<void> {
    await this.withTransaction(async (manager) => {
      return await this.removeWithTransaction(timesheet, manager);
    });
  }
}