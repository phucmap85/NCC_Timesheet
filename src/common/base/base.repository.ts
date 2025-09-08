import { 
  In, Repository, 
  FindManyOptions,
  FindOneOptions,
  UpdateResult,
  DeleteResult,
  QueryRunner,
  EntityManager,
  SelectQueryBuilder,
  DeepPartial,
  FindOptionsWhere,
  SaveOptions,
  RemoveOptions,
  ObjectLiteral,
} from 'typeorm';
import type { EntityTarget, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseRepository<T extends ObjectLiteral> {
  protected repository: Repository<T>;
  protected dataSource: DataSource;
  protected entityTarget: EntityTarget<T>;

  constructor(
    dataSource: DataSource,
    entityTarget: EntityTarget<T>
  ) {
    this.dataSource = dataSource;
    this.entityTarget = entityTarget;
    this.repository = dataSource.getRepository(entityTarget);
  }

  async getAllPaging(
    filterItems: any[], 
    searchText: string, 
    skipCount: number, 
    maxResultCount: number,
    searchFields: string[] = ['name'],
    orderByField: string = 'updatedAt',
    orderDirection: 'ASC' | 'DESC' = 'DESC'
  ): Promise<{ totalCount: number; items: T[] }> {
    if (skipCount < 0) skipCount = 0;
    if (maxResultCount <= 0) maxResultCount = 10;
    if (maxResultCount > 1000) maxResultCount = 1000;

    const entityAlias = this.getEntityAlias();
    let query = this.createQueryBuilder(entityAlias);

    // Apply search across multiple fields if searchText is provided
    if (searchText && searchText.trim() !== '') {
      const searchConditions = searchFields.map((field, index) => 
        `${entityAlias}.${field} LIKE :searchText${index}`
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
            if (item.value === null || item.value === undefined) {
              condition = `${entityAlias}.${item.propertyName} IS NULL`;
              query = query.andWhere(condition);
            } else {
              condition = `${entityAlias}.${item.propertyName} = :${paramName}`;
              query = query.andWhere(condition, { [paramName]: item.value });
            }
            break;
          case 1: // Not Equal
            if (item.value === null || item.value === undefined) {
              condition = `${entityAlias}.${item.propertyName} IS NOT NULL`;
              query = query.andWhere(condition);
            } else {
              condition = `${entityAlias}.${item.propertyName} != :${paramName}`;
              query = query.andWhere(condition, { [paramName]: item.value });
            }
            break;
          case 2: // Contains (LIKE)
            if (item.value === null || item.value === undefined) {
              condition = `${entityAlias}.${item.propertyName} IS NULL`;
              query = query.andWhere(condition);
            } else {
              condition = `${entityAlias}.${item.propertyName} LIKE :${paramName}`;
              query = query.andWhere(condition, { [paramName]: `%${item.value}%` });
            }
            break;
          case 3: // Starts with
            if (item.value === null || item.value === undefined) {
              condition = `${entityAlias}.${item.propertyName} IS NULL`;
              query = query.andWhere(condition);
            } else {
              condition = `${entityAlias}.${item.propertyName} LIKE :${paramName}`;
              query = query.andWhere(condition, { [paramName]: `${item.value}%` });
            }
            break;
          case 4: // Ends with
            if (item.value === null || item.value === undefined) {
              condition = `${entityAlias}.${item.propertyName} IS NULL`;
              query = query.andWhere(condition);
            } else {
              condition = `${entityAlias}.${item.propertyName} LIKE :${paramName}`;
              query = query.andWhere(condition, { [paramName]: `%${item.value}` });
            }
            break;
          default:
            // Default to equal comparison
            if (item.value === null || item.value === undefined) {
              condition = `${entityAlias}.${item.propertyName} IS NULL`;
              query = query.andWhere(condition);
            } else {
              condition = `${entityAlias}.${item.propertyName} = :${paramName}`;
              query = query.andWhere(condition, { [paramName]: item.value });
            }
        }
      });
    }

    const [items, total] = await query
      .orderBy(`${entityAlias}.${orderByField}`, orderDirection)
      .skip(skipCount)
      .take(maxResultCount)
      .getManyAndCount();

    return {
      totalCount: total,
      items: items,
    };
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(options);
  }

  async findById(id: number | string): Promise<T | null> {
    return this.repository.findOne({ where: { id } as any });
  }

  async findByIds(ids: (number | string)[]): Promise<T[]> {
    return this.repository.findBy({ id: In(ids) as any });
  }

  create(entity: DeepPartial<T>): T {
    return this.repository.create(entity);
  }

  async save(entity: DeepPartial<T>, options?: SaveOptions): Promise<T> {
    return this.repository.save(entity, options);
  }

  async saveMultiple(entities: DeepPartial<T>[], options?: SaveOptions): Promise<T[]> {
    return this.repository.save(entities, options);
  }

  async update(criteria: FindOptionsWhere<T>, partialEntity: DeepPartial<T>): Promise<UpdateResult> {
    return this.repository.update(criteria, partialEntity as any);
  }

  async delete(criteria: FindOptionsWhere<T>): Promise<DeleteResult> {
    return this.repository.delete(criteria);
  }

  async remove(entity: T, options?: RemoveOptions): Promise<T> {
    return this.repository.remove(entity, options);
  }

  async removeMultiple(entities: T[], options?: RemoveOptions): Promise<T[]> {
    return this.repository.remove(entities, options);
  }

  async restore(criteria: FindOptionsWhere<T>): Promise<UpdateResult> {
    return this.repository.restore(criteria);
  }

  async count(options?: FindManyOptions<T>): Promise<number> {
    return this.repository.count(options);
  }

  async exists(options: FindOneOptions<T>): Promise<boolean> {
    const count = await this.count({
      where: options.where,
      take: 1
    });
    return count > 0;
  }

  createQueryBuilder(alias?: string, queryRunner?: QueryRunner): SelectQueryBuilder<T> {
    return this.repository.createQueryBuilder(alias, queryRunner);
  }

  getRepository(manager?: EntityManager): Repository<T> {
    if (manager) return manager.getRepository(this.entityTarget);
    return this.repository;
  }

  // Transaction operations
  async withTransaction<R>(operation: (manager: EntityManager) => Promise<R>): Promise<R> {
    const queryRunner = this.dataSource.createQueryRunner();
    
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const result = await operation(queryRunner.manager);
      
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // Helper methods for transaction operations
  protected async saveWithTransaction(entity: DeepPartial<T>, manager: EntityManager): Promise<T> {
    const repository = this.getRepository(manager);
    return repository.save(entity);
  }

  protected async saveMultipleWithTransaction(entities: DeepPartial<T>[], manager: EntityManager): Promise<T[]> {
    const repository = this.getRepository(manager);
    return repository.save(entities);
  }

  protected async updateWithTransaction(
    criteria: FindOptionsWhere<T>, 
    partialEntity: DeepPartial<T>, 
    manager: EntityManager
  ): Promise<UpdateResult> {
    const repository = this.getRepository(manager);
    return repository.update(criteria, partialEntity as any);
  }

  protected async deleteWithTransaction(criteria: FindOptionsWhere<T>, manager: EntityManager): Promise<DeleteResult> {
    const repository = this.getRepository(manager);
    return repository.delete(criteria);
  }

  protected async removeWithTransaction(entity: T, manager: EntityManager): Promise<T> {
    const repository = this.getRepository(manager);
    return repository.remove(entity);
  }

  protected async removeMultipleWithTransaction(entities: T[], manager: EntityManager): Promise<T[]> {
    const repository = this.getRepository(manager);
    return repository.remove(entities);
  }

  protected async findOneWithTransaction(options: FindOneOptions<T>, manager: EntityManager): Promise<T | null> {
    const repository = this.getRepository(manager);
    return repository.findOne(options);
  }

  protected async findWithTransaction(options: FindManyOptions<T>, manager: EntityManager): Promise<T[]> {
    const repository = this.getRepository(manager);
    return repository.find(options);
  }

  protected getEntityAlias(): string {
    const entityMetadata = this.repository.metadata;
    return entityMetadata.tableName.toLowerCase();
  }

  // Bulk operations
  async bulkInsert(entities: DeepPartial<T>[]): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .insert()
      .values(entities as any)
      .execute();
  }

  async bulkUpdate(criteria: FindOptionsWhere<T>, partialEntity: DeepPartial<T>): Promise<UpdateResult> {
    return this.repository
      .createQueryBuilder()
      .update()
      .set(partialEntity as any)
      .where(criteria)
      .execute();
  }

  async bulkDelete(criteria: FindOptionsWhere<T>): Promise<DeleteResult> {
    return this.repository
      .createQueryBuilder()
      .delete()
      .where(criteria)
      .execute();
  }
}
