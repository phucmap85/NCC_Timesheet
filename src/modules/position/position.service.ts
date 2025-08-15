import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from 'src/entities';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class PositionService extends BaseService<Position> {
  constructor(
    @InjectRepository(Position) private positionRepository: Repository<Position>,
  ) {
    super(positionRepository, 'position');
  }

  async getAllPagging(
    filterItems: any[], 
    searchText: string, 
    skipCount: number, 
    maxResultCount: number
  ): Promise<object | null> {
    return super.getAllPaging(filterItems, searchText, skipCount, maxResultCount, ["name", "shortName", "code"], "id", "ASC");
  }

  async getPositionById(id: number): Promise<object | null> {
    try {
      const position = await this.positionRepository.findOne({ where: { id: id } });

      if (!position) return null;
      
      return position;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllPositionDropDownList(): Promise<object | null> {
    const positions = await this.getAllPagging([], "", 0, 1e18);
    
    if (!positions || !positions['items']) return null;

    return positions['items'];
  }

  async createPosition(
    name: string, 
    shortName: string, 
    code: string, 
    color: string
  ): Promise<object | null> {
    try {
      const existingName = await this.positionRepository.findOne({ where: { name: name } });
      if (existingName) {
        throw new Error(`Position with name ${name} already exists`);
      }
      const existingShortName = await this.positionRepository.findOne({ where: { shortName: shortName } });
      if (existingShortName) {
        throw new Error(`Position with short name ${shortName} already exists`);
      }
      const existingCode = await this.positionRepository.findOne({ where: { code: code } });
      if (existingCode) {
        throw new Error(`Position with code ${code} already exists`);
      }
      
      const newPosition = this.positionRepository.create({ 
        name: name, 
        shortName: shortName, 
        code: code, 
        color: color
      });
      await this.positionRepository.save(newPosition);
      return newPosition;
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
      let position = await this.positionRepository.findOne({ where: { id: id } });
      if (!position) throw new Error("Position not found");
      
      if(name !== position.name) {
        const existingName = await this.positionRepository.findOne({ where: { name: name } });
        if (existingName && existingName.id !== id) {
          throw new Error(`Position with name ${name} already exists`);
        }
      }

      if(shortName !== position.shortName) {
        const existingShortName = await this.positionRepository.findOne({ where: { shortName: shortName } });
        if (existingShortName && existingShortName.id !== id) {
          throw new Error(`Position with short name ${shortName} already exists`);
        }
      }

      if(code !== position.code) {
        const existingCode = await this.positionRepository.findOne({ where: { code: code } });
        if (existingCode && existingCode.id !== id) {
          throw new Error(`Position with code ${code} already exists`);
        }
      }

      position.name = name;
      position.shortName = shortName;
      position.code = code;
      position.color = color;
      await this.positionRepository.save(position);
      
      return position;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deletePosition(id: number) {
    try {
      const position = await this.positionRepository.findOne({ where: { id: id } });
      if (!position) throw new Error(`Position not found`);

      try {
        await this.positionRepository.remove(position);
      } catch (error) {
        throw new Error(`Position ID ${id} has users assigned, cannot be deleted`);
      }      
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
