import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchController } from 'src/modules/branch/branch.controller';
import { BranchService } from 'src/modules/branch/branch.service';
import { BranchRepository } from 'src/common/repositories/branch.repository';
import { Branch } from 'src/common/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Branch])],
  controllers: [BranchController],
  providers: [BranchService, BranchRepository],
})
export class BranchModule {}
