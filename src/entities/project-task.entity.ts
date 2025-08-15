import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { Project } from './project.entity';
import { Task } from './task.entity';
import { Timesheet } from './timesheet.entity';

@Entity('project_tasks')
@Index('project_tasks_index_0', ['projectId', 'taskId'], { unique: true })
export class ProjectTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  @Column()
  taskId: number;

  @Column({ type: 'boolean', default: false })
  billable: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Project, project => project.projectTasks, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @ManyToOne(() => Task, task => task.projectTasks, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @OneToMany(() => Timesheet, timesheet => timesheet.projectTask)
  timesheets: Timesheet[];
}
