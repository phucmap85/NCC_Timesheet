import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { CustomerModule } from 'src/modules/customer/customer.module';
import { 
  Project,
  User,
  Task,
  Client,
  ProjectUser,
  ProjectTask,
  ProjectTargetUser
} from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      User,
      Task,
      Client,
      ProjectUser,
      ProjectTask,
      ProjectTargetUser
    ]),
    CustomerModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
