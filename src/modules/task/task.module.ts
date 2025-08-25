import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from 'src/modules/task/task.controller';
import { TaskService } from 'src/modules/task/task.service';
import { Task } from 'src/common/database/entities';
import { TaskRepository } from 'src/common/repositories/task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
})
export class TaskModule {}
