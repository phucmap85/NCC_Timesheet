import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { RolePermission } from 'src/common/database/entities/role-permission.entity';
import { UserRole } from 'src/common/database/entities/user-role.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  displayName: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  normalizedName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;

  @OneToMany(() => RolePermission, rolePermission => rolePermission.role)
  rolePermissions: RolePermission[];

  @OneToMany(() => UserRole, userRole => userRole.role)
  userRoles: UserRole[];
}
