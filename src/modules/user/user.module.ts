import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserRole } from 'src/entities';
import { BranchModule } from 'src/modules/branch/branch.module';
import { PositionModule } from 'src/modules/position/position.module';
import { RoleModule } from 'src/modules/role/role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRole]),
    BranchModule,
    PositionModule,
    forwardRef(() => RoleModule)
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
