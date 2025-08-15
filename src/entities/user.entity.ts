import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Position } from './position.entity';
import { Branch } from './branch.entity';
import { UserRole } from './user-role.entity';
import { ProjectUser } from './project-user.entity';
import { ProjectTargetUser } from './project-target-user.entity';
import { Timesheet } from './timesheet.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  userName: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  surname: string;

  @Column({ type: 'varchar', length: 200 })
  fullName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  emailAddress: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  phoneNumber: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'int', default: 0 })
  sex: number;

  @Column({ type: 'text', nullable: true })
  avatarPath: string;

  @Column({ type: 'text', nullable: true })
  avatarFullPath: string;

  @Column({ nullable: true })
  managerId: number;

  @Column({ nullable: true })
  positionId: number;

  @Column({ nullable: true })
  branchId: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  jobTitle: string;

  @Column({ type: 'int', default: 0 })
  type: number;

  @Column({ type: 'int', nullable: true })
  level: number;

  @Column({ type: 'int', nullable: true })
  beginLevel: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salary: number;

  @Column({ type: 'date', nullable: true })
  salaryAt: Date;

  @Column({ type: 'int', default: 0 })
  allowLeaveDay: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'date', nullable: true })
  startDateAt: Date;

  @Column({ type: 'date', nullable: true })
  endDateAt: Date;

  @Column({ type: 'boolean', default: false })
  isWorkingTimeDefault: boolean;

  @Column({ type: 'float', nullable: true })
  morningWorking: number;

  @Column({ type: 'time', nullable: true })
  morningStartAt: string;

  @Column({ type: 'time', nullable: true })
  morningEndAt: string;

  @Column({ type: 'float', nullable: true })
  afternoonWorking: number;

  @Column({ type: 'time', nullable: true })
  afternoonStartAt: string;

  @Column({ type: 'time', nullable: true })
  afternoonEndAt: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Position, position => position.users)
  @JoinColumn({ name: 'positionId' })
  position: Position;

  @ManyToOne(() => Branch, branch => branch.users)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @ManyToOne(() => User, user => user.subordinates)
  @JoinColumn({ name: 'managerId' })
  manager: User;

  @OneToMany(() => User, user => user.manager)
  subordinates: User[];

  @OneToMany(() => UserRole, userRole => userRole.user)
  userRoles: UserRole[];

  @OneToMany(() => ProjectUser, projectUser => projectUser.user)
  projectUsers: ProjectUser[];

  @OneToMany(() => ProjectTargetUser, projectTargetUser => projectTargetUser.user)
  projectTargetUsers: ProjectTargetUser[];

  @OneToMany(() => Timesheet, timesheet => timesheet.user)
  timesheets: Timesheet[];

  @OneToMany(() => Timesheet, timesheet => timesheet.approver)
  approvedTimesheets: Timesheet[];
}
