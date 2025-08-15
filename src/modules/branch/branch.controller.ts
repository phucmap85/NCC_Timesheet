import { Controller, Get, Post, Body, Delete, Query } from '@nestjs/common';
import { GetAllPaggingDto } from 'src/base/base.dto';
import { BranchDto } from 'src/modules/branch/branch.dto';
import { BranchService } from './branch.service';

@Controller('Branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post("GetAllPagging")
  async getAllPagging(@Body() getAllPaggingDto: GetAllPaggingDto): Promise<object | null> {
    const {
      filterItems = [], 
      searchText = "", 
      skipCount = 0, 
      maxResultCount = 10
    } = getAllPaggingDto;
    
    return this.branchService.getAllPagging(filterItems, searchText, skipCount, maxResultCount);
  }

  @Get("GetAllBranchFilter")
  async getAllBranchFilter(@Query("isAll") isAll: boolean): Promise<object | null> {
    return this.branchService.GetAllBranchFilter(isAll);
  }

  @Post("Save")
  async createOrEditBranch(@Body() branchDto: BranchDto): Promise<object | null> {
    const { 
      id = 0, 
      name, 
      displayName, 
      code, 
      color = "",
      morningWorking,
      morningStartAt,
      morningEndAt,
      afternoonWorking,
      afternoonStartAt,
      afternoonEndAt
    } = branchDto;

    return this.branchService.createOrEditBranch(
      id, 
      name, 
      displayName, 
      code, 
      color, 
      morningWorking,
      morningStartAt,
      morningEndAt,
      afternoonWorking,
      afternoonStartAt,
      afternoonEndAt
    );
  }

  @Delete("Delete")
  async deleteBranch(@Query("Id") id: number) {
    return this.branchService.deleteBranch(id);
  }
}
