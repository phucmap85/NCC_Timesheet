import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from 'src/entities';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class BranchService extends BaseService<Branch> {
  constructor(
    @InjectRepository(Branch) private branchRepository: Repository<Branch>,
  ) {
    super(branchRepository, 'branch');
  }

  async getAllPagging(
    filterItems: any[], 
    searchText: string, 
    skipCount: number, 
    maxResultCount: number
  ): Promise<object | null> {
    return super.getAllPaging(filterItems, searchText, skipCount, maxResultCount, ["name", "displayName", "code"], "id", "ASC");
  }

  async GetAllBranchFilter(isAll: boolean): Promise<object | null> {
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

  async getBranchById(id: number): Promise<object | null> {
    try {
      const branch = await this.branchRepository.findOne({ where: { id: id } });
      
      if (!branch) return null;
      
      return branch;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
      // Validate working times vs start/end times
      const parseTime = (t: string) => {
        if(!t) return null;
        const parts = t.split(':').map(Number);
        const [h, m, s = 0] = parts; // Default seconds to 0 if not provided
        if (parts.length < 2 || parts.length > 3 || 
            isNaN(h) || isNaN(m) || isNaN(s) || 
            h < 0 || h > 23 || m < 0 || m > 59 || s < 0 || s > 59) 
          throw new Error('Invalid time value');
        return h * 60 + m + s / 60; // Convert to minutes with seconds as fraction
      };
      const diffHours = (start: string, end: string) => {
        const s = parseTime(start);
        const e = parseTime(end);
        if (s === null || e === null) return null;
        if (e <= s) throw new Error(`End time ${end} must be after start time ${start}`);
        return (e - s) / 60;
      };
      const nearlyEqual = (a: number, b: number, eps = 0.01) => Math.abs(a - b) < eps;

      if (morningStartAt && morningEndAt) {
        const morningHours = diffHours(morningStartAt, morningEndAt);
        if (morningHours !== null && !nearlyEqual(morningHours, morningWorking)) {
          throw new Error(`Morning working time (${morningWorking}h) does not match duration between ${morningStartAt} and ${morningEndAt}`);
        }
      }

      if (afternoonStartAt && afternoonEndAt) {
        const afternoonHours = diffHours(afternoonStartAt, afternoonEndAt);
        if (afternoonHours !== null && !nearlyEqual(afternoonHours, afternoonWorking)) {
          throw new Error(`Afternoon working time (${afternoonWorking}h) does not match duration between ${afternoonStartAt} and ${afternoonEndAt}`);
        }
      }

      // Create new branch
      if(id === 0) {
        const existingName = await this.branchRepository.findOne({ where: { name: name } });
        if (existingName) {
          throw new Error(`Branch with name ${name} already exists`);
        }
        const existingDisplayName = await this.branchRepository.findOne({ where: { displayName: displayName } });
        if (existingDisplayName) {
          throw new Error(`Branch with display name ${displayName} already exists`);
        }
        const existingCode = await this.branchRepository.findOne({ where: { code: code } });
        if (existingCode) {
          throw new Error(`Branch with code ${code} already exists`);
        }
        
        const newBranch = this.branchRepository.create({ 
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
        });
        await this.branchRepository.save(newBranch);
        return newBranch;
      }

      // Update existing branch
      let branch = await this.branchRepository.findOne({ where: { id: id } });
      if (!branch) throw new Error("Branch not found");
      
      if(name !== branch.name) {
        const existingName = await this.branchRepository.findOne({ where: { name: name } });
        if (existingName && existingName.id !== id) {
          throw new Error(`Branch with name ${name} already exists`);
        }
      }

      if(displayName !== branch.displayName) {
        const existingDisplayName = await this.branchRepository.findOne({ where: { displayName: displayName } });
        if (existingDisplayName && existingDisplayName.id !== id) {
          throw new Error(`Branch with display name ${displayName} already exists`);
        }
      }

      if(code !== branch.code) {
        const existingCode = await this.branchRepository.findOne({ where: { code: code } });
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
      await this.branchRepository.save(branch);
      
      return branch;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteBranch(id: number) {
    try {
      const branch = await this.branchRepository.findOne({ where: { id: id } });
      if (!branch) throw new Error(`Branch not found`);

      try {
        await this.branchRepository.remove(branch);
      } catch (error) {
        throw new Error(`Branch ID ${id} has users assigned, cannot be deleted`);
      }      
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
