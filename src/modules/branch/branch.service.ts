import { Injectable, BadRequestException } from '@nestjs/common';
import { BranchRepository } from 'src/common/repositories/branch.repository';
import { validateWorkingHours } from 'src/common/utils/validators/working-hours.validator';
import { Branch } from 'src/common/database/entities';

@Injectable()
export class BranchService {
  constructor(private readonly branchRepository: BranchRepository) {}

  async getAllPagging(
    filterItems: any[], 
    searchText: string, 
    skipCount: number, 
    maxResultCount: number
  ): Promise<object | null> {
    return this.branchRepository.getAllPaging(
      filterItems, searchText, skipCount, maxResultCount, 
      ["name", "displayName", "code"], 
      "id", "ASC"
    );
  }

  async getAllBranchFilter(isAll: boolean): Promise<object | null> {
    const branches = await this.getAllPagging([], '', 0, 1e18);
    
    if(!branches || !branches['items']) return null;

    if(isAll) {
      branches['items'].unshift({
        id: 0,
        name: 'All',
        displayName: 'All',
        code: 'ALL',
        color: '#000000'
      });
    }

    return branches['items'];
  }

  async createOrEditBranch(
    id: number, 
    name: string, 
    displayName: string, 
    code: string, 
    color: string,
    morningWorking: number,
    morningStartAt: string,
    morningEndAt: string,
    afternoonWorking: number,
    afternoonStartAt: string,
    afternoonEndAt: string
  ): Promise<object | null> {
    try {
      validateWorkingHours(
        morningWorking, morningStartAt, morningEndAt, 
        afternoonWorking, afternoonStartAt, afternoonEndAt
      );

      // Create new branch
      if(id === 0) {
        const existingName = await this.branchRepository.getBranchByName(name);
        if (existingName) {
          throw new Error(`Branch with name ${name} already exists`);
        }
        const existingDisplayName = await this.branchRepository.getBranchByDisplayName(displayName);
        if (existingDisplayName) {
          throw new Error(`Branch with display name ${displayName} already exists`);
        }
        const existingCode = await this.branchRepository.getBranchByCode(code);
        if (existingCode) {
          throw new Error(`Branch with code ${code} already exists`);
        }
        
        const newBranch = { 
          name: name, 
          displayName: displayName, 
          code: code, 
          color: color,
          morningWorking: morningWorking,
          morningStartAt: morningStartAt,
          morningEndAt: morningEndAt,
          afternoonWorking: afternoonWorking,
          afternoonStartAt: afternoonStartAt,
          afternoonEndAt: afternoonEndAt
        } as Branch;

        return await this.branchRepository.saveBranch(newBranch);
      }

      // Update existing branch
      let branch = await this.branchRepository.getBranchById(id);
      if (!branch) throw new Error("Branch not found");
      
      if(name !== branch.name) {
        const existingName = await this.branchRepository.getBranchByName(name);
        if (existingName && existingName.id !== id) {
          throw new Error(`Branch with name ${name} already exists`);
        }
      }

      if(displayName !== branch.displayName) {
        const existingDisplayName = await this.branchRepository.getBranchByDisplayName(displayName);
        if (existingDisplayName && existingDisplayName.id !== id) {
          throw new Error(`Branch with display name ${displayName} already exists`);
        }
      }

      if(code !== branch.code) {
        const existingCode = await this.branchRepository.getBranchByCode(code);
        if (existingCode && existingCode.id !== id) {
          throw new Error(`Branch with code ${code} already exists`);
        }
      }

      branch.name = name;
      branch.displayName = displayName;
      branch.code = code;
      branch.color = color;
      branch.morningWorking = morningWorking;
      branch.morningStartAt = morningStartAt;
      branch.morningEndAt = morningEndAt;
      branch.afternoonWorking = afternoonWorking;
      branch.afternoonStartAt = afternoonStartAt;
      branch.afternoonEndAt = afternoonEndAt;
      
      return await this.branchRepository.saveBranch(branch);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteBranch(id: number) {
    try {
      const branch = await this.branchRepository.getBranchById(id);
      if (!branch) throw new Error(`Branch not found`);

      try {
        await this.branchRepository.removeBranch(branch);
      } catch (error) {
        throw new Error(`Branch ID ${id} has users assigned, cannot be deleted`);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
