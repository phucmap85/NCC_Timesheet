import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Client } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [CustomerService],
  controllers: [CustomerController]
})
export class CustomerModule {}
