import { Injectable, BadRequestException } from '@nestjs/common';
import { Position } from 'src/common/database/entities';
import { RepositoryManager } from 'src/common/repositories';

@Injectable()
export class PositionService {
  constructor(private readonly repositories: RepositoryManager) {}

  async getAllPagging(
    filterItems: any[], 
    searchText: string, 
    skipCount: number, 
    maxResultCount: number
  ): Promise<object | null> {
    return this.repositories.position.getAllPaging(
      filterItems, searchText, skipCount, maxResultCount, 
      ["name", "shortName", "code"], 
      "id", "ASC"
    );
  }

  async getAllPositionDropDownList(): Promise<object | null> {
    const positions = await this.getAllPagging([], "", 0, 1e18);
    return (positions && positions['items']) ? positions['items'] : null;
  }

  async createPosition(
    name: string, 
    shortName: string, 
    code: string, 
    color: string
  ): Promise<object | null> {
    try {
      const existingName = await this.repositories.position.getPositionByName(name);
      if (existingName) {
        throw new Error(`Position with name ${name} already exists`);
      }
      const existingShortName = await this.repositories.position.getPositionByShortName(shortName);
      if (existingShortName) {
        throw new Error(`Position with short name ${shortName} already exists`);
      }
      const existingCode = await this.repositories.position.getPositionByCode(code);
      if (existingCode) {
        throw new Error(`Position with code ${code} already exists`);
      }
      
      const newPosition = { 
        name: name, 
        shortName: shortName, 
        code: code, 
        color: color
      } as Position;
      return await this.repositories.position.savePosition(newPosition);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updatePosition(
    id: number, 
    name: string, 
    shortName: string, 
    code: string, 
    color: string
  ): Promise<object | null> {
    try {
      let position = await this.repositories.position.getPositionById(id);
      if (!position) throw new Error("Position not found");
      
      if(name !== position.name) {
        const existingName = await this.repositories.position.getPositionByName(name);
        if (existingName && existingName.id !== id) {
          throw new Error(`Position with name ${name} already exists`);
        }
      }

      if(shortName !== position.shortName) {
        const existingShortName = await this.repositories.position.getPositionByShortName(shortName);
        if (existingShortName && existingShortName.id !== id) {
          throw new Error(`Position with short name ${shortName} already exists`);
        }
      }

      if(code !== position.code) {
        const existingCode = await this.repositories.position.getPositionByCode(code);
        if (existingCode && existingCode.id !== id) {
          throw new Error(`Position with code ${code} already exists`);
        }
      }

      position.name = name;
      position.shortName = shortName;
      position.code = code;
      position.color = color;
      
      return await this.repositories.position.savePosition(position);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deletePosition(id: number): Promise<void> {
    try {
      const position = await this.repositories.position.getPositionById(id);
      if (!position) throw new Error(`Position not found`);

      if (position.users && position.users.length > 0) {
        throw new Error(`Position ID ${id} has users assigned, cannot be deleted`);
      }

      return await this.repositories.position.removePosition(position);    
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
