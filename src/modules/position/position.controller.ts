import { Controller, Get, Post, Body, Delete, Query, Put } from '@nestjs/common';
import { GetAllPaggingDto } from 'src/base/base.dto';
import { PositionDto } from 'src/modules/position/position.dto';
import { PositionService } from './position.service';

@Controller('Position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post("GetAllPagging")
  async getAllPagging(@Body() getAllPaggingDto: GetAllPaggingDto): Promise<object | null> {
    const {
      filterItems = [], 
      searchText = "", 
      skipCount = 0, 
      maxResultCount = 10
    } = getAllPaggingDto;
    
    return this.positionService.getAllPagging(filterItems, searchText, skipCount, maxResultCount);
  }

  @Get("GetAllPositionDropDownList")
  async getAllPositionDropDownList(): Promise<object | null> {
    return this.positionService.getAllPositionDropDownList();
  }

  @Post("Create")
  async createPosition(@Body() positionDto: PositionDto): Promise<object | null> {
    const { id, name, shortName, code, color } = positionDto;

    return this.positionService.createPosition(name, shortName, code, color);
  }

  @Put("Update")
  async updatePosition(@Body() positionDto: PositionDto): Promise<object | null> {
    const { id = 0, name, shortName, code, color } = positionDto;

    return this.positionService.updatePosition(id, name, shortName, code, color);
  }

  @Delete("Delete")
  async deletePosition(@Query("Id") id: number) {
    return this.positionService.deletePosition(id);
  }
}
