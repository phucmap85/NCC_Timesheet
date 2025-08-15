import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project, ProjectTargetUser, ProjectTask, ProjectUser } from 'src/entities';
import { CustomerModule } from 'src/modules/customer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, ProjectUser, ProjectTask, ProjectTargetUser]),
    CustomerModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
