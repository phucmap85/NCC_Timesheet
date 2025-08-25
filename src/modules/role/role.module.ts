import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from 'src/modules/role/role.controller';
import { RoleService } from 'src/modules/role/role.service';
import { Role, RolePermission, UserRole, User } from 'src/common/database/entities';
import { RoleRepository, RolePermissionRepository, UserRoleRepository, UserRepository } from 'src/common/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RolePermission, UserRole, User])],
  controllers: [RoleController],
  providers: [
    RoleService,
    RoleRepository,
    RolePermissionRepository,
    UserRoleRepository,
    UserRepository
  ],
})
export class RoleModule {}
