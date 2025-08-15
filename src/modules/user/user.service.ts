import { Injectable, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/entities';
import { BaseService } from 'src/base/base.service';
import { BranchService } from 'src/modules/branch/branch.service';
import { PositionService } from 'src/modules/position/position.service';
import { RoleService } from 'src/modules/role/role.service';
import { UserRoleDto } from 'src/modules/role/user_role.dto';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserRole) private userRoleRepository: Repository<UserRole>,
    private readonly branchService: BranchService,
    private readonly positionService: PositionService,
    @Inject(forwardRef(() => RoleService))
    private readonly roleService: RoleService
  ) {
    super(userRepository, 'user');
  }

  async getAllPagging(
    filterItems: any[], 
    searchText: string, 
    skipCount: number, 
    maxResultCount: number
  ): Promise<object | null> {
    try {
      const users = await super.getAllPaging(filterItems, searchText, skipCount, maxResultCount, ["name", "surname", "fullName", "emailAddress", "userName"]);

      if(!users || !users['items']) return null;

      users['items'] = await Promise.all(users['items'].map(async (user: object) => {
        const position = await this.positionService.getPositionById(user['positionId']);
        const branch = await this.branchService.getBranchById(user['branchId']);
        
        return {
          ...user,
          
          "password": undefined, // Remove password
          
          "positionName": position ? position['name'] : null,
          
          "branchColor": branch ? branch['color'] : null,
          "branchDisplayName": branch ? branch['displayName'] : null,

          "creationTime": user['createdAt']
        };
      }));

      return users;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUserByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
    try {
      if ((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(usernameOrEmail)) {
        return await this.userRepository.findOne({ where: { emailAddress: usernameOrEmail } });
      }
      return await this.userRepository.findOne({ where: { userName: usernameOrEmail } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUserById(id: number): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });

      if (!user) throw new Error(`User with id ${id} does not exist`);

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUserNotPagging(): Promise<object | null> {
    const users = await this.getAllPagging([], "", 0, 1e18);
    
    if (!users || !users['items']) return null;

    return users['items'];
  }

  async getAllManager(): Promise<object | null> {
    const users = await this.getAllPagging([], "", 0, 1e18);

    if(!users || !users['items']) return null;

    const managerIds = new Set<number>(
      users['items']
        .map((user: any) => user['managerId'])
        .filter((id: any): id is number => typeof id === 'number')
    );
    
    const managers = users['items'].filter((user: any) => managerIds.has(user['id']));

    return managers;
  }

  async changeUserRole(userRole: UserRoleDto): Promise<object | null> {
    try {
      const { userId, role } = userRole;

      if (!userId || !role) {
        throw new BadRequestException("User ID and role are required");
      }

      // Check if user exists
      await this.getUserById(userId);
      
      // Check if role exists
      const roleId = await this.roleService.getRoleByName(role) as any;

      // Check if user_role already exists
      const existingUserRole = await this.userRoleRepository.findOne({ where: { userId: userId, roleId: roleId['id'] } });
      if (existingUserRole) {
        await this.userRoleRepository.remove(existingUserRole);
      } else {
        await this.userRoleRepository.save({ userId: userId, roleId: roleId['id'] });
      }

      return null;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
