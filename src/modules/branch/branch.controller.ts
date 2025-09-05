import { Controller, Get, Post, Body, Delete, Query, ParseBoolPipe, ParseIntPipe, HttpCode } from '@nestjs/common';
import { GetAllPaggingDto } from 'src/common/base/base.dto';
import { BranchDto } from 'src/modules/branch/branch.dto';
import { BranchService } from 'src/modules/branch/branch.service';
import { Permissions } from 'src/common/constants/enum';
import { HasPermissions } from 'src/common/decorators/permisson.decorator';

@Controller('Branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post("GetAllPagging")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Branchs, Permissions.Admin_Branchs_View)
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
  @HasPermissions(Permissions.Admin, Permissions.Admin_Branchs, Permissions.Admin_Branchs_View)
  async getAllNotPagging(): Promise<object | null> {
    return this.branchService.getAllPagging([], '', 0, 1e18);
  }

  @Get("GetAllBranchFilter")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Branchs, Permissions.Admin_Branchs_View)
  async getAllBranchFilter(@Query("isAll", ParseBoolPipe) isAll: boolean): Promise<object | null> {
    return this.branchService.getAllBranchFilter(isAll);
  }

  @Post("Save")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Branchs, [Permissions.Admin_Branchs_Edit, Permissions.Admin_Branchs_AddNew])
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
  @HasPermissions(Permissions.Admin, Permissions.Admin_Branchs, Permissions.Admin_Branchs_Delete)
  @HttpCode(200)
  async deleteBranch(@Query("Id", ParseIntPipe) id: number): Promise<void> {
    return this.branchService.deleteBranch(id);
  }
}
