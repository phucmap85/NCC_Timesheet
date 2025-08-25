import { Injectable } from '@nestjs/common';
import { DataSource, Like } from 'typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { Client } from 'src/common/database/entities';

@Injectable()
export class ClientRepository extends BaseRepository<Client> {
  constructor(dataSource: DataSource) {
    super(dataSource, Client);
  }

  async getCustomerIdByName(name: string): Promise<number | null> {
    const customer = await this.findOne({ where: { name: Like(`%${name}%`) } });
    return customer ? customer.id : null;
  }

  async getCustomerById(id: number): Promise<Client | null> {
    return this.findOne({ where: { id: id } });
  }

  async getCustomerByName(name: string): Promise<Client | null> {
    return this.findOne({ where: { name: name } });
  }

  async getCustomerByCode(code: string): Promise<Client | null> {
    return this.findOne({ where: { code: code } });
  }

  async saveCustomer(customer: Partial<Client>): Promise<Client> {
    return await this.withTransaction(async (manager) => {
      return await this.saveWithTransaction(customer, manager);
    });
  }

  async removeCustomer(customer: Client): Promise<void> {
    await this.withTransaction(async (manager) => {
      return await this.removeWithTransaction(customer, manager);
    });
  }
}