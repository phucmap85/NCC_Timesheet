import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionController } from 'src/modules/position/position.controller';
import { PositionService } from 'src/modules/position/position.service';
import { PositionRepository } from 'src/common/repositories/position.repository';
import { Position } from 'src/common/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Position])],
  controllers: [PositionController],
  providers: [PositionService, PositionRepository],
})
export class PositionModule {}
