import { Controller, Get, Post, Body, Delete, Query, Put, ParseIntPipe, HttpCode } from '@nestjs/common';
import { GetAllPaggingDto } from 'src/common/base/base.dto';
import { PositionDto } from 'src/modules/position/position.dto';
import { PositionService } from 'src/modules/position/position.service';
import { Permissions } from 'src/common/constants/enum';
import { HasPermissions } from 'src/common/decorators/permisson.decorator';

@Controller('Position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post("GetAllPagging")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Position, Permissions.Admin_Position_View)
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
  @HasPermissions(Permissions.Admin, Permissions.Admin_Position, Permissions.Admin_Position_View)
  async getAllPositionDropDownList(): Promise<object | null> {
    return this.positionService.getAllPositionDropDownList();
  }

  @Post("Create")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Position, Permissions.Admin_Position_AddNew)
  @HttpCode(200)
  async createPosition(@Body() positionDto: PositionDto): Promise<object | null> {
    const { id, name, shortName, code, color } = positionDto;

    return this.positionService.createPosition(name, shortName, code, color);
  }

  @Put("Update")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Position, Permissions.Admin_Position_Edit)
  @HttpCode(200)
  async updatePosition(@Body() positionDto: PositionDto): Promise<object | null> {
    const { id = 0, name, shortName, code, color } = positionDto;

    return this.positionService.updatePosition(id, name, shortName, code, color);
  }

  @Delete("Delete")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Position, Permissions.Admin_Position_Delete)
  @HttpCode(200)
  async deletePosition(@Query("Id", ParseIntPipe) id: number): Promise<void> {
    return this.positionService.deletePosition(id);
  }
}
