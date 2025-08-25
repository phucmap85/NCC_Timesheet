import { Controller, Get, Post, Body, Delete, Query, ParseIntPipe, HttpCode } from '@nestjs/common';
import { CustomerDto } from 'src/modules/customer/customer.dto';
import { GetAllPaggingDto } from 'src/common/base/base.dto';
import { CustomerService } from 'src/modules/customer/customer.service';

@Controller('Customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post("GetAllPagging")
  @HttpCode(200)
  async getAllPagging(@Body() getAllPaggingDto: GetAllPaggingDto): Promise<object | null> {
    const {
      filterItems = [], 
      searchText = "", 
      skipCount = 0, 
      maxResultCount = 10
    } = getAllPaggingDto;
    
    return this.customerService.getAllPagging(filterItems, searchText, skipCount, maxResultCount);
  }

  @Get("GetAll")
  async getAllCustomers(): Promise<object | null> {
    return this.customerService.getAllCustomers();
  }

  @Post("Save")
  @HttpCode(200)
  async createOrEditCustomer(@Body() customerDto: CustomerDto): Promise<object | null> {
    const { id = 0, name, code, address = "" } = customerDto;

    return this.customerService.createOrEditCustomer(id, name, code, address);
  }

  @Delete("Delete")
  @HttpCode(200)
  async deleteCustomer(@Query("Id", ParseIntPipe) id: number): Promise<void> {
    return this.customerService.deleteCustomer(id);
  }
}
