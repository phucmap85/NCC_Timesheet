import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Client } from 'src/entities';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class CustomerService extends BaseService<Client> {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {
    super(clientRepository, 'client');
  }

  async getAllPagging(
    filterItems: any[], 
    searchText: string, 
    skipCount: number, 
    maxResultCount: number
  ): Promise<object | null> {
    return super.getAllPaging(filterItems, searchText, skipCount, maxResultCount, ["name", "code", "address"]);
  }

  async getAllCustomers(): Promise<object | null> {
    const customers = await this.getAllPagging([], "", 0, 1e18);
    return (customers && customers['items']) ? customers['items'] : null;
  }

  // No use in controller
  async getCustomerIdByName(name: string): Promise<number | null> {
    const customer = await this.clientRepository.findOne({ 
      where: { name: Like(`%${name}%`) } 
    });
    return customer ? customer.id : null;
  }

  // No use in controller
  async getCustomerById(id: number): Promise<object | null> {
    const customer = await this.clientRepository.findOne({ where: { id: id } });
    return customer ? customer : null;
  }

  async createOrEditCustomer(
    id: number, name: string, code: string, address: string
  ): Promise<object | null> {
    try {
      // Create new customer
      if(id === 0) {
        const existingName = await this.clientRepository.findOne({ where: { name: name } });
        if (existingName) {
          throw new Error(`Customer with name ${name} already exists`);
        }
        const existingCode = await this.clientRepository.findOne({ where: { code: code } });
        if (existingCode) {
          throw new Error(`Customer with code ${code} already exists`);
        }
        
        const newClient = this.clientRepository.create({ name: name, code: code, address: address });
        await this.clientRepository.save(newClient);
        return newClient;
      }

      // Update existing customer
      let client = await this.clientRepository.findOne({ where: { id: id } });
      if (!client) throw new Error("Customer not found");
      
      if(name !== client.name) {
        const existingName = await this.clientRepository.findOne({ where: { name: name } });
        if (existingName && existingName.id !== id) {
          throw new Error(`Customer with name ${name} already exists`);
        }
      }

      if(code !== client.code) {
        const existingCode = await this.clientRepository.findOne({ where: { code: code } });
        if (existingCode && existingCode.id !== id) {
          throw new Error(`Customer with code ${code} already exists`);
        }
      }

      client.name = name;
      client.code = code;
      client.address = address;
      await this.clientRepository.save(client);
      
      return client;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteCustomer(id: number) {
    try {
      const client = await this.clientRepository.findOne({ where: { id: id } });
      if (!client) throw new Error(`Customer not found`);

      try {
        await this.clientRepository.remove(client);
      } catch (error) {
        throw new Error(`Customer ID ${id} has projects, cannot be deleted`);
      }      
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
