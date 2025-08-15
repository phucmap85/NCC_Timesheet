import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { Position } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Position])],
  controllers: [PositionController],
  providers: [PositionService],
  exports: [PositionService]
})
export class PositionModule {}
