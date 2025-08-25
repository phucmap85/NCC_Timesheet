import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/modules/user/user.controller';
import { UserService } from 'src/modules/user/user.service';
import { ProjectUser, User, UserRole } from 'src/common/database/entities';
import { 
  UserRepository, 
  UserRoleRepository, 
  ProjectUserRepository,
  BranchRepository,
  PositionRepository,
  RoleRepository
} from 'src/common/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRole, ProjectUser]),
  ],
  controllers: [UserController],
  providers: [
    UserService, 
    UserRepository, 
    UserRoleRepository, 
    ProjectUserRepository,
    BranchRepository,
    PositionRepository,
    RoleRepository
  ],
})
export class UserModule {}
