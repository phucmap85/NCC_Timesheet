import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository, ObjectLiteral } from 'typeorm';

@Injectable()
export abstract class BaseService<T extends ObjectLiteral> {
  protected constructor(
    protected repository: Repository<T>,
    protected entityAlias: string
  ) {}

  async getAllPaging(
    filterItems: any[], 
    searchText: string, 
    skipCount: number, 
    maxResultCount: number,
    searchFields: string[] = ['name'],
    orderByField: string = 'updatedAt',
    orderDirection: 'ASC' | 'DESC' = 'DESC'
  ): Promise<object | null> {
    try {
      let query = this.repository.createQueryBuilder(this.entityAlias);

      // Apply search across multiple fields if searchText is provided
      if (searchText && searchText.trim() !== '') {
        const searchConditions = searchFields.map((field, index) => 
          `${this.entityAlias}.${field} LIKE :searchText${index}`
        );
        const searchParams = searchFields.reduce((params, field, index) => {
          params[`searchText${index}`] = `%${searchText}%`;
          return params;
        }, {} as Record<string, string>);

        query = query.where(`(${searchConditions.join(' OR ')})`, searchParams);
      }

      // Apply filter items
      if (filterItems && filterItems.length > 0) {
        filterItems.forEach((item, index) => {
          const paramName = `filterValue${index}`;
          let condition = '';
          
          switch (item.comparison) {
            case 0: // Equal
              condition = `${this.entityAlias}.${item.propertyName} = :${paramName}`;
              query = query.andWhere(condition, { [paramName]: item.value });
              break;
            case 1: // Not Equal
              condition = `${this.entityAlias}.${item.propertyName} != :${paramName}`;
              query = query.andWhere(condition, { [paramName]: item.value });
              break;
            case 2: // Contains (LIKE)
              condition = `${this.entityAlias}.${item.propertyName} LIKE :${paramName}`;
              query = query.andWhere(condition, { [paramName]: `%${item.value}%` });
              break;
            case 3: // Starts with
              condition = `${this.entityAlias}.${item.propertyName} LIKE :${paramName}`;
              query = query.andWhere(condition, { [paramName]: `${item.value}%` });
              break;
            case 4: // Ends with
              condition = `${this.entityAlias}.${item.propertyName} LIKE :${paramName}`;
              query = query.andWhere(condition, { [paramName]: `%${item.value}` });
              break;
            default:
              // Default to equal comparison
              condition = `${this.entityAlias}.${item.propertyName} = :${paramName}`;
              query = query.andWhere(condition, { [paramName]: item.value });
          }
        });
      }

      const [items, total] = await query
        .orderBy(`${this.entityAlias}.${orderByField}`, orderDirection)
        .skip(skipCount)
        .take(maxResultCount)
        .getManyAndCount();

      return {
        "totalCount": total,
        "items": items,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
