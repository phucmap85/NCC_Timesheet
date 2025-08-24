import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/common/database/entities/user.entity';
import { Project } from 'src/common/database/entities/project.entity';

@Entity('project_users')
export class ProjectUser {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  projectId: number;

  @Column({ type: 'boolean', default: false })
  isTemp: boolean;

  @Column({ type: 'int', default: 0 })
  type: number;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;

  @ManyToOne(() => User, user => user.projectUsers, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Project, project => project.projectUsers, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
