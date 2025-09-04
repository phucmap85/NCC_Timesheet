import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Client } from 'src/common/database/entities/client.entity';
import { ProjectTask } from 'src/common/database/entities/project-task.entity';
import { ProjectUser } from 'src/common/database/entities/project-user.entity';
import { ProjectTargetUser } from 'src/common/database/entities/project-target-user.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ nullable: true })
  customerId: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  code: string;

  @Column({ type: 'int', default: 1 })
  projectType: number;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ type: 'timestamp', nullable: true })
  timeStart: Date;

  @Column({ type: 'timestamp', nullable: true })
  timeEnd: Date;

  @Column({ type: 'int', default: 0 })
  status: number;

  @Column({ type: 'int', default: 0 })
  notifyChannel: number;

  @Column({ type: 'text', nullable: true })
  mezonUrl: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  komuChannelId: string;

  @Column({ type: 'boolean', default: false })
  isNoticeKMSubmitTS: boolean;

  @Column({ type: 'boolean', default: false })
  isNoticeKMRequestOffDate: boolean;

  @Column({ type: 'boolean', default: false })
  isNoticeKMApproveRequestOffDate: boolean;

  @Column({ type: 'boolean', default: false })
  isNoticeKMRequestChangeWorkingTime: boolean;

  @Column({ type: 'boolean', default: false })
  isNoticeKMApproveChangeWorkingTime: boolean;

  @Column({ type: 'boolean', default: false })
  isAllUserBelongTo: boolean;

  @Column({ type: 'boolean', default: false })
  isAllowTeamBuilding: boolean;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;

  @ManyToOne(() => Client, client => client.projects)
  @JoinColumn({ name: 'customerId' })
  customer: Client;

  @OneToMany(() => ProjectTask, projectTask => projectTask.project)
  projectTasks: ProjectTask[];

  @OneToMany(() => ProjectUser, projectUser => projectUser.project)
  projectUsers: ProjectUser[];

  @OneToMany(() => ProjectTargetUser, projectTargetUser => projectTargetUser.project)
  projectTargetUsers: ProjectTargetUser[];
}
