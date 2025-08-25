import { Controller, Get, Post, Body, Delete, Query, ParseBoolPipe, ParseIntPipe, HttpCode } from '@nestjs/common';
import { GetAllPaggingDto } from 'src/common/base/base.dto';
import { BranchDto } from 'src/modules/branch/branch.dto';
import { BranchService } from 'src/modules/branch/branch.service';

@Controller('Branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post("GetAllPagging")
  @HttpCode(200)
  async getAllPagging(@Body() getAllPaggingDto: GetAllPaggingDto): Promise<object | null> {
    const {
      filterItems = [], 
      searchText = "", 
      skipCount = 0, 
      maxResultCount = 10
    } = getAllPaggingDto;
    
    return this.branchService.getAllPagging(filterItems, searchText, skipCount, maxResultCount);
  }
  
  @Get("GetAllNotPagging")
  async getAllNotPagging(): Promise<object | null> {
    return this.branchService.getAllPagging([], '', 0, 1e18);
  }

  @Get("GetAllBranchFilter")
  async getAllBranchFilter(@Query("isAll", ParseBoolPipe) isAll: boolean): Promise<object | null> {
    return this.branchService.getAllBranchFilter(isAll);
  }

  @Post("Save")
  @HttpCode(200)
  async createOrEditBranch(@Body() branchDto: BranchDto): Promise<object | null> {
    const { 
      id = 0, name, displayName, code, color = "",
      morningWorking, morningStartAt, morningEndAt,
      afternoonWorking, afternoonStartAt, afternoonEndAt
    } = branchDto;

    return this.branchService.createOrEditBranch(
      id, name, displayName, code, color,
      morningWorking, morningStartAt, morningEndAt,
      afternoonWorking, afternoonStartAt, afternoonEndAt
    );
  }

  @Delete("Delete")
  @HttpCode(200)
  async deleteBranch(@Query("Id", ParseIntPipe) id: number): Promise<void> {
    return this.branchService.deleteBranch(id);
  }
}
