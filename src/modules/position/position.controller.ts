import { Controller, Get, Post, Body, Delete, Query, Put, ParseIntPipe, HttpCode } from '@nestjs/common';
import { GetAllPaggingDto } from 'src/common/base/base.dto';
import { PositionDto } from 'src/modules/position/position.dto';
import { PositionService } from 'src/modules/position/position.service';

@Controller('Position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post("GetAllPagging")
  @HttpCode(200)
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
  @HttpCode(200)
  async createPosition(@Body() positionDto: PositionDto): Promise<object | null> {
    const { id, name, shortName, code, color } = positionDto;

    return this.positionService.createPosition(name, shortName, code, color);
  }

  @Put("Update")
  @HttpCode(200)
  async updatePosition(@Body() positionDto: PositionDto): Promise<object | null> {
    const { id = 0, name, shortName, code, color } = positionDto;

    return this.positionService.updatePosition(id, name, shortName, code, color);
  }

  @Delete("Delete")
  @HttpCode(200)
  async deletePosition(@Query("Id", ParseIntPipe) id: number): Promise<void> {
    return this.positionService.deletePosition(id);
  }
}
