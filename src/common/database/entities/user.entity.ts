import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Position } from 'src/common/database/entities/position.entity';
import { Branch } from 'src/common/database/entities/branch.entity';
import { UserRole } from 'src/common/database/entities/user-role.entity';
import { ProjectUser } from 'src/common/database/entities/project-user.entity';
import { ProjectTargetUser } from 'src/common/database/entities/project-target-user.entity';
import { Timesheet } from 'src/common/database/entities/timesheet.entity';

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

  @Column({ type: 'int', nullable: true })
  type: number;

  @Column({ type: 'int', nullable: true })
  level: number;

  @Column({ type: 'int', nullable: true })
  beginLevel: number;

  @Column({ type: 'int', nullable: true })
  salary: number;

  @Column({ type: 'datetime', nullable: true })
  salaryAt: Date;

  @Column({ type: 'int', default: 0 })
  allowedLeaveDay: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'datetime', nullable: true })
  startDateAt: Date;

  @Column({ type: 'datetime', nullable: true })
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
  creationTime: Date;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
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
