import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from 'src/modules/customer/customer.controller';
import { CustomerService } from 'src/modules/customer/customer.service';
import { Client } from 'src/common/database/entities';
import { ClientRepository } from 'src/common/repositories/customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [CustomerController],
  providers: [CustomerService, ClientRepository],
})
export class CustomerModule {}
