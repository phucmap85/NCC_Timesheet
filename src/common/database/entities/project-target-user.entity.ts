import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from 'src/common/database/entities/project.entity';
import { User } from 'src/common/database/entities/user.entity';

@Entity('project_target_users')
export class ProjectTargetUser {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  projectId: number;

  @Column({ type: 'text' })
  roleName: string;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;

  @ManyToOne(() => User, user => user.projectTargetUsers, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Project, project => project.projectTargetUsers, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
