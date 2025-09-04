import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from 'src/common/database/entities/user.entity';
import { ProjectTask } from 'src/common/database/entities/project-task.entity';

@Entity('timesheets')
export class Timesheet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  projectTaskId: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  note: string;

  @Column({ type: 'int' })
  workingTime: number;

  @Column({ type: 'boolean', default: true })
  billable: boolean;

  @Column({ type: 'boolean', default: false })
  isCharged: boolean;

  @Column({ type: 'int', nullable: true })
  targetTimesheetId: number;

  @Column({ type: 'int', default: 0 })
  status: number;

  @Column({ type: 'int', default: 0 })
  typeOfWork: number;

  @Column({ nullable: true })
  approvedBy: number;

  @Column({ type: 'boolean', default: false })
  isTemp: boolean;

  @Column({ type: 'timestamp' })
  dateAt: Date;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;

  @ManyToOne(() => User, user => user.timesheets)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => ProjectTask, projectTask => projectTask.timesheets)
  @JoinColumn({ name: 'projectTaskId' })
  projectTask: ProjectTask;

  @ManyToOne(() => User, user => user.approvedTimesheets)
  @JoinColumn({ name: 'approvedBy' })
  approver: User;

  @ManyToOne(() => Timesheet, timesheet => timesheet.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'targetTimesheetId' })
  targetTimesheet: Timesheet;

  @OneToMany(() => Timesheet, timesheet => timesheet.targetTimesheet)
  shadowTimesheets: Timesheet[];
}
