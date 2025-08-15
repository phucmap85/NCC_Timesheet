import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('branches')
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  displayName: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 40 })
  color: string;

  @Column({ type: 'float' })
  morningWorking: number;

  @Column({ type: 'time' })
  morningStartAt: string;

  @Column({ type: 'time' })
  morningEndAt: string;

  @Column({ type: 'float' })
  afternoonWorking: number;

  @Column({ type: 'time' })
  afternoonStartAt: string;

  @Column({ type: 'time' })
  afternoonEndAt: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => User, user => user.branch)
  users: User[];
}
