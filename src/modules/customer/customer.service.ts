import { Injectable, BadRequestException } from '@nestjs/common';
import { ClientRepository } from 'src/common/repositories/customer.repository';
import { Client } from 'src/common/database/entities';

@Injectable()
export class CustomerService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async getAllPagging(
    filterItems: any[], 
    searchText: string, 
    skipCount: number, 
    maxResultCount: number
  ): Promise<object | null> {
    return this.clientRepository.getAllPaging(
      filterItems, searchText, skipCount, maxResultCount, 
      ["name", "code", "address"]
    );
  }

  async getAllCustomers(): Promise<object | null> {
    const customers = await this.getAllPagging([], "", 0, 1e18);
    return (customers && customers['items']) ? customers['items'] : null;
  }

  async createOrEditCustomer(
    id: number, name: string, code: string, address: string
  ): Promise<object | null> {
    try {
      // Create new customer
      if(id === 0) {
        const existingName = await this.clientRepository.getCustomerByName(name);
        if (existingName) {
          throw new Error(`Customer with name ${name} already exists`);
        }
        const existingCode = await this.clientRepository.getCustomerByCode(code);
        if (existingCode) {
          throw new Error(`Customer with code ${code} already exists`);
        }
        
        const newClient = { name: name, code: code, address: address } as Client;
        return await this.clientRepository.saveCustomer(newClient);
      }

      // Update existing customer
      let client = await this.clientRepository.getCustomerById(id);
      if (!client) throw new Error("Customer not found");
      
      if(name !== client.name) {
        const existingName = await this.clientRepository.getCustomerByName(name);
        if (existingName && existingName.id !== id) {
          throw new Error(`Customer with name ${name} already exists`);
        }
      }

      if(code !== client.code) {
        const existingCode = await this.clientRepository.getCustomerByCode(code);
        if (existingCode && existingCode.id !== id) {
          throw new Error(`Customer with code ${code} already exists`);
        }
      }

      client.name = name;
      client.code = code;
      client.address = address;
      
      return await this.clientRepository.saveCustomer(client);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteCustomer(id: number): Promise<void> {
    try {
      const client = await this.clientRepository.getCustomerById(id);
      if (!client) throw new Error(`Customer not found`);

      try {
        return await this.clientRepository.removeCustomer(client);
      } catch (error) {
        throw new Error(`Customer ID ${id} has projects, cannot be deleted`);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
