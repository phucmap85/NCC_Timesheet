import { Injectable, BadRequestException } from '@nestjs/common';
import { User, UserRole, ProjectUser } from 'src/common/database/entities';
import { 
  UserRoleDto,
  UpdateRoleDto,
  ResetPasswordDto,
  CreateUserDto,
  UpdateUserDto
} from 'src/modules/user/user.dto';
import { validateWorkingHours } from 'src/common/utils/validators/working-hours.validator';
import { convertExcelTimeToString } from 'src/common/utils/converters/excel-time.converter';
import { RepositoryManager } from 'src/common/repositories';
import { app } from 'src/main';
import * as bcrypt from 'bcrypt';
import * as xlsx from 'xlsx';
import * as fs from 'fs/promises';

@Injectable()
export class UserService {
  constructor(private readonly repositories: RepositoryManager) {}

  async getAllPagging(
    filterItems: any[], 
    searchText: string, 
    skipCount: number, 
    maxResultCount: number
  ): Promise<object | null> {
    try {
      const users = await this.repositories.user.getAllPaging(
        filterItems, 
        searchText, 
        skipCount, 
        maxResultCount, 
        ["name", "surname", "fullName", "emailAddress", "userName"]
      );

      if(!users || !users.items) return null;

      const modifiedUsers = await Promise.all(users.items.map(async (user: User) => {
        // Get manager, position, branch, roles, and projects
        const manager = user.managerId ? await this.getUserById(user.managerId) as User : null;

        const position = await this.repositories.position.getPositionById(user.positionId);
        const branch = await this.repositories.branch.getBranchById(user.branchId);
        
        const roles = await this.repositories.userRole.findAll({ where: { userId: user.id }, relations: ['role'] });
        const roleNames = roles.map((userRole: UserRole) => userRole.role.name);

        const project = await this.repositories.projectUser.findAll({ where: { userId: user.id }, relations: ['project'] });
        const projectIds = project.map((projectUser: ProjectUser) => projectUser.project.id);

        const pmsId = await Promise.all(projectIds.map(async (projectId: number) => {
          return await this.repositories.projectUser.findAll({
            where: { projectId: projectId, type: 1 },
            relations: ['user']
          });
        }));

        return {
          ...user,
          
          "password": undefined, // Remove password
          
          "positionName": position ? position['name'] : null,

          "managerName": manager ? manager.name : null,
          "managerAvatarPath": manager ? manager.avatarPath : null,
          "managerAvatarFullPath": manager ? manager.avatarFullPath : null,
          
          "branch": null,
          "branchColor": branch ? branch['color'] : null,
          "branchDisplayName": branch ? branch['displayName'] : null,

          "roleNames": roleNames.length > 0 ? roleNames : [],

          "projectUsers": project ? project.map((projectUser: ProjectUser, index) => ({
            "pms": pmsId[index] ? pmsId[index].map((pms: any) => pms.user.fullName).flat() : [],
            "projectId": projectUser.project.id,
            "projectName": projectUser.project.name,
            "projectCode": projectUser.project.code,
            "projectUserType": projectUser.type
          })) : [],

          "userCode": null
        };
      }));

      users.items = modifiedUsers as any;

      return users;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUserById(id: number): Promise<User | object | null> {
    try {
      const user = await this.repositories.user.getUserById(id);
      if (!user) return null;
      
      // Get roles
      const roles = await this.repositories.userRole.findAll({ where: { userId: user.id }, relations: ['role'] });
      const roleNames = roles.map((userRole: UserRole) => userRole.role.name);
      
      return {
        ...user,
        "password": undefined, // Remove password
        "roleNames": roleNames.length > 0 ? roleNames : []
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUserNotPagging(): Promise<object | null> {
    const users = await this.getAllPagging([], "", 0, 1e18);
    return (users && users['items']) ? users['items'] : null;
  }

  async getAllManager(): Promise<object | null> {
    try {
      // Get all users with their basic info
      const allUsers = await this.repositories.user.findAll();
      
      // Get unique manager IDs
      const managerIds = new Set<number>(
        allUsers
          .map((user: User) => user.managerId)
          .filter((id: any): id is number => typeof id === 'number')
      );
      
      // Filter users who are managers and get their details
      const managers = await Promise.all(
        allUsers
          .filter((user: User) => managerIds.has(user.id))
          .map(async (user: User) => {
            const position = await this.repositories.position.getPositionById(user.positionId);
            const branch = await this.repositories.branch.getBranchById(user.branchId);
            
            return {
              ...user,
              "password": undefined,
              "positionName": position ? position['name'] : null,
              "branchColor": branch ? branch['color'] : null,
              "branchDisplayName": branch ? branch['displayName'] : null
            };
          })
      );

      return managers;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getRoles(): Promise<object | null> {
    try {
      return await this.repositories.role.getAllPaging([], "", 0, 1e18);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUserAvatarById(id: number): Promise<object | null> {
    try {
      const user = await this.repositories.user.getUserById(id);
      if (!user) throw new Error(`User with ID ${id} does not exist`);

      return {
        avatarPath: user.avatarPath,
        avatarFullPath: user.avatarFullPath};
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUserEmailById(id: number): Promise<string | null> {
    try {
      const user = await this.repositories.user.getUserById(id);
      if (!user) throw new Error(`User with ID ${id} does not exist`);

      return user.emailAddress;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async changeUserRole(userRole: UserRoleDto): Promise<object | null> {
    try {
      const { userId, role } = userRole;

      // Check if user exists
      if(!await this.getUserById(userId)) {
        throw new Error(`User with ID ${userId} does not exist`);
      }
      
      // Check if role exists
      const roleData = await this.repositories.role.getRoleByName(role) as any;
      if (!roleData) {
        throw new Error(`Role ${role} does not exist`);
      }

      // Check if user_role already exists
      const existingUserRole = await this.repositories.userRole.findOne({ 
        where: { userId: userId, roleId: roleData['id'] } 
      });
      if (existingUserRole) {
        await this.repositories.userRole.remove(existingUserRole);
      } else {
        await this.repositories.userRole.save({ userId: userId, roleId: roleData['id'] });
      }

      return null;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateRole(updateRole: UpdateRoleDto): Promise<object | null> {
    const { id, roleNames } = updateRole;

    // Check if user exists
    if(!await this.getUserById(id)) throw new BadRequestException(`User with ID ${id} does not exist`);
    
    // Check if role exists
    const allRoles = await this.repositories.role.getAllRolesWithRelations();
    const allRoleNames = allRoles ? allRoles.map((r: any) => r.normalizedName) : [];
    for (const role of roleNames) {
      if (!allRoleNames.includes(role)) throw new BadRequestException(`Role ${role} does not exist`);
    }

    const roleIds = roleNames
      .map((roleName: string) => {
        const role = allRoles.find((r: any) => r.normalizedName === roleName);
        return role ? role.id : null;
      })
      .filter((id, index, arr) => id !== null && arr.indexOf(id) === index) as number[];

    return await this.repositories.userRole.updateUserRoles(id, roleIds);
  }

  async updateAvatar(id: number, file: Express.Multer.File): Promise<string | null> {
    try {
      const user = await this.repositories.user.getUserById(id);
      if (!user) throw new Error(`User with ID ${id} does not exist`);

      // Delete old avatar if it exists
      if(user.avatarPath && user.avatarFullPath) {
        try {
          await fs.unlink(user.avatarPath);
        } catch (error) {
          throw new Error(`Failed to delete old avatar`);
        }
      }
      
      // Update avatar path and full path
      const baseUrl = await app.getUrl();
      user.avatarPath = file.path.replace(/\\/g, '/');
      user.avatarFullPath = `${baseUrl}/${file.path.replace(/\\/g, '/')}`;

      await this.repositories.user.saveUser(user);
      return user.avatarFullPath;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async importWorkingTimeFromFile(file: Express.Multer.File): Promise<object | null> {
    try {   
      const fileBuffer = await fs.readFile(file.path);

      const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
      if (!workbook.SheetNames || workbook.SheetNames.length <= 0) {
        throw new Error('No sheets found in the file');
      }

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      if (!worksheet) throw new Error('No data found in the first sheet');
      
      const data = xlsx.utils.sheet_to_json(worksheet) as any;

      if (!data || data.length <= 0) throw new Error('No data found in the file');
      else {
        // Validate data
        for (const item of data) {
          const user = await this.repositories.user.getUserByUsernameOrEmail(item['username/email']);
          if (!user || !item['username/email']) {
            throw new Error(`User with username/email ${item['username/email']} does not exist`);
          }

          // Convert Excel time format to string format and validate
          const morningStartAt = convertExcelTimeToString(item.morningStartAt);
          const morningEndAt = convertExcelTimeToString(item.morningEndAt);
          const afternoonStartAt = convertExcelTimeToString(item.afternoonStartAt);
          const afternoonEndAt = convertExcelTimeToString(item.afternoonEndAt);

          // Validate time format (hh:mm or hh:mm:ss)
          const timeFormatRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
          
          if (!timeFormatRegex.test(morningStartAt)) {
            throw new Error(`morningStartAt must be in hh:mm or hh:mm:ss format`);
          }
          if (!timeFormatRegex.test(morningEndAt)) {
            throw new Error(`morningEndAt must be in hh:mm or hh:mm:ss format`);
          }
          if (!timeFormatRegex.test(afternoonStartAt)) {
            throw new Error(`afternoonStartAt must be in hh:mm or hh:mm:ss format`);
          }
          if (!timeFormatRegex.test(afternoonEndAt)) {
            throw new Error(`afternoonEndAt must be in hh:mm or hh:mm:ss format`);
          }

          // Validate working duration
          if (typeof item.morningWorking !== 'number' || item.morningWorking < 0) {
            throw new Error(`morningWorking must be a positive number`);
          }
          if (typeof item.afternoonWorking !== 'number' || item.afternoonWorking < 0) {
            throw new Error(`afternoonWorking must be a positive number`);
          }

          if(item.morningWorking > 12) {
            throw new Error(`morningWorking must be less than or equal to 12 hours`);
          }
          if(item.afternoonWorking > 12) {
            throw new Error(`afternoonWorking must be less than or equal to 12 hours`);
          }
        }

        // Update working time for each user
        for (const item of data) {
          const user = await this.repositories.user.getUserByUsernameOrEmail(item['username/email']) as any;

          const morningStartAt = convertExcelTimeToString(item.morningStartAt);
          const morningEndAt = convertExcelTimeToString(item.morningEndAt);
          const afternoonStartAt = convertExcelTimeToString(item.afternoonStartAt);
          const afternoonEndAt = convertExcelTimeToString(item.afternoonEndAt);

          validateWorkingHours(
            item.morningWorking, morningStartAt, morningEndAt,
            item.afternoonWorking, afternoonStartAt, afternoonEndAt
          );

          user.morningWorking = item.morningWorking;
          user.morningStartAt = morningStartAt;
          user.morningEndAt = morningEndAt;
          user.afternoonWorking = item.afternoonWorking;
          user.afternoonStartAt = afternoonStartAt;
          user.afternoonEndAt = afternoonEndAt;

          await this.repositories.user.save(user);
        }
      }

      return null;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async resetPassword(resetPassword: ResetPasswordDto): Promise<boolean | null> {
    try {
      const { userId, newPassword } = resetPassword;

      const user = await this.repositories.user.getUserById(userId);
      if (!user) throw new Error(`User with ID ${userId} does not exist`);

      user.password = await bcrypt.hash(newPassword, 12);
      await this.repositories.user.saveUser(user);

      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createUser(createUser: CreateUserDto): Promise<object | null> {
    try {
      const {
        userName,
        password,
        name,
        surname,
        emailAddress,
        phoneNumber,
        positionId,
        branchId,
        managerId,
        isActive,
        isWorkingTimeDefault,
        morningWorking,
        morningStartAt,
        morningEndAt,
        afternoonWorking,
        afternoonStartAt,
        afternoonEndAt,
        roleNames
      } = createUser;

      if (await this.repositories.user.getUserByUsername(userName)) {
        throw new Error(`Username ${userName} is already taken`);
      }
      if (await this.repositories.user.getUserByEmail(emailAddress)) {
        throw new Error(`Email address ${emailAddress} is already taken`);
      }
      if (await this.repositories.user.getUserByPhoneNumber(phoneNumber)) {
        throw new Error(`Phone number ${phoneNumber} is already taken`);
      }
      if (managerId && !await this.repositories.user.getUserById(managerId)) {
        throw new Error(`Manager with ID ${managerId} does not exist`);
      }
      if (positionId && !await this.repositories.position.getPositionById(positionId)) {
        throw new Error(`Position with ID ${positionId} does not exist`);
      }
      if (branchId && !await this.repositories.branch.getBranchById(branchId)) {
        throw new Error(`Branch with ID ${branchId} does not exist`);
      }
      if (roleNames && roleNames.length > 0) {
        for (const roleName of roleNames) {
          if (!await this.repositories.role.getRoleByNormalizedName(roleName)) {
            throw new Error(`Role ${roleName} does not exist`);
          }
        }
      }
      if (!isWorkingTimeDefault) {
        if (!morningWorking || !morningStartAt || !morningEndAt || 
            !afternoonWorking || !afternoonStartAt || !afternoonEndAt
          ) {
          throw new Error('Please provide complete working time details or set isWorkingTimeDefault to true');
        }
        validateWorkingHours(
          morningWorking, morningStartAt, morningEndAt,
          afternoonWorking, afternoonStartAt, afternoonEndAt
        );
      }
      else {
        if (!branchId) throw new Error('Please provide branchId to set default working time');
        const branch = await this.repositories.branch.getBranchById(branchId);
        if (!branch) throw new Error(`Branch with ID ${branchId} does not exist`);

        createUser.morningWorking = branch.morningWorking;
        createUser.morningStartAt = branch.morningStartAt;
        createUser.morningEndAt = branch.morningEndAt;
        createUser.afternoonWorking = branch.afternoonWorking;
        createUser.afternoonStartAt = branch.afternoonStartAt;
        createUser.afternoonEndAt = branch.afternoonEndAt;
      }

      createUser.fullName = `${name} ${surname}`;
      createUser.password = await bcrypt.hash(password, 12);

      return await this.repositories.user.saveUser(createUser as any);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(updateUser: UpdateUserDto): Promise<object | null> {
    try {
      const {
        id,
        userName,
        password,
        name,
        surname,
        emailAddress,
        phoneNumber,
        positionId,
        branchId,
        managerId,
        isActive,
        isWorkingTimeDefault,
        morningWorking,
        morningStartAt,
        morningEndAt,
        afternoonWorking,
        afternoonStartAt,
        afternoonEndAt,
        roleNames
      } = updateUser;

      const user = await this.repositories.user.getUserById(id);
      if (!user) throw new Error(`User with ID ${id} does not exist`);

      if (userName && userName !== user.userName) {
        throw new Error('Username cannot be changed');
      }

      if (emailAddress && emailAddress !== user.emailAddress) {
        if (await this.repositories.user.getUserByEmail(emailAddress)) {
          throw new Error(`Email address ${emailAddress} is already taken`);
        }
        user.emailAddress = emailAddress;
      }

      if (phoneNumber && phoneNumber !== user.phoneNumber) {
        if (await this.repositories.user.getUserByPhoneNumber(phoneNumber)) {
          throw new Error(`Phone number ${phoneNumber} is already taken`);
        }
        user.phoneNumber = phoneNumber;
      }

      if (managerId && managerId !== user.managerId) {
        if (!await this.repositories.user.getUserById(managerId)) {
          throw new Error(`Manager with ID ${managerId} does not exist`);
        }
        user.managerId = managerId;
      }

      if (positionId && positionId !== user.positionId) {
        if (!await this.repositories.position.getPositionById(positionId)) {
          throw new Error(`Position with ID ${positionId} does not exist`);
        }
        user.positionId = positionId;
      }

      if (branchId && branchId !== user.branchId) {
        if (!await this.repositories.branch.getBranchById(branchId)) {
          throw new Error(`Branch with ID ${branchId} does not exist`);
        }
        user.branchId = branchId;
      }

      if (roleNames && roleNames.length > 0) {
        for (const roleName of roleNames) {
          if (!await this.repositories.role.getRoleByNormalizedName(roleName)) {
            throw new Error(`Role ${roleName} does not exist`);
          }
        }
      }

      if (isWorkingTimeDefault !== undefined) {
        if (!isWorkingTimeDefault) {
          if (!morningWorking || !morningStartAt || !morningEndAt || 
              !afternoonWorking || !afternoonStartAt || !afternoonEndAt) {
            throw new Error('Please provide complete working time details or set isWorkingTimeDefault to true');
          }
          validateWorkingHours(
            morningWorking, morningStartAt, morningEndAt,
            afternoonWorking, afternoonStartAt, afternoonEndAt
          );
          user.isWorkingTimeDefault = false;
          user.morningWorking = morningWorking;
          user.morningStartAt = morningStartAt;
          user.morningEndAt = morningEndAt;
          user.afternoonWorking = afternoonWorking;
          user.afternoonStartAt = afternoonStartAt;
          user.afternoonEndAt = afternoonEndAt;
        } else {
          const effectiveBranchId = branchId || user.branchId;
          if (!effectiveBranchId) throw new Error('Please provide branchId to set default working time');
          
          const branch = await this.repositories.branch.getBranchById(effectiveBranchId);
          if (!branch) throw new Error(`Branch with ID ${effectiveBranchId} does not exist`);

          user.isWorkingTimeDefault = true;
          user.morningWorking = branch.morningWorking;
          user.morningStartAt = branch.morningStartAt;
          user.morningEndAt = branch.morningEndAt;
          user.afternoonWorking = branch.afternoonWorking;
          user.afternoonStartAt = branch.afternoonStartAt;
          user.afternoonEndAt = branch.afternoonEndAt;
        }
      }

      if (name) user.name = name;
      if (surname) user.surname = surname;
      if (name || surname) user.fullName = `${user.name} ${user.surname}`;
      if (updateUser.fullName) user.fullName = updateUser.fullName;
      if (updateUser.address !== undefined) user.address = updateUser.address;
      if (updateUser.sex !== undefined) user.sex = updateUser.sex;
      if (branchId !== undefined) user.branchId = branchId;
      if (updateUser.jobTitle !== undefined) user.jobTitle = updateUser.jobTitle;
      if (updateUser.type !== undefined) user.type = updateUser.type;
      if (updateUser.level !== undefined) user.level = updateUser.level;
      if (updateUser.beginLevel !== undefined) user.beginLevel = updateUser.beginLevel;
      if (updateUser.salary !== undefined) user.salary = updateUser.salary;
      if (updateUser.salaryAt) user.salaryAt = new Date(updateUser.salaryAt);
      if (updateUser.allowedLeaveDay !== undefined) user.allowedLeaveDay = updateUser.allowedLeaveDay;
      if (isActive !== undefined) user.isActive = isActive;
      if (updateUser.startDateAt) user.startDateAt = new Date(updateUser.startDateAt);
      if (updateUser.endDateAt) user.endDateAt = new Date(updateUser.endDateAt);

      return await this.repositories.user.saveUser(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async activeUser(userId: number): Promise<object | null> {
    try {
      const user = await this.repositories.user.getUserById(userId);
      if (!user) throw new Error(`User with ID ${userId} does not exist`);

      // Check if user is already active
      if (user.isActive) throw new Error(`User with ID ${userId} is already active`);

      user.isActive = true;
      await this.repositories.user.saveUser(user);

      return null;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deactiveUser(userId: number): Promise<object | null> {
    try {
      const user = await this.repositories.user.findOne({ where: { id: userId }, relations: ['subordinates', 'projectUsers', 'projectTargetUsers'] });
      if (!user) throw new Error(`User with ID ${userId} does not exist`);

      // Check if user is already deactivated
      if (!user.isActive) throw new Error(`User with ID ${userId} is already deactivated`);

      // Check if user is a manager of other users
      if (user.subordinates.length > 0) {
        throw new Error(`Cannot deactivate user with ID ${userId} because they are a manager of other users`);
      }

      // Check if user has any projects
      if (user.projectUsers.length > 0 || user.projectTargetUsers.length > 0) {
        throw new Error(`Cannot deactivate user with ID ${userId} because they are assigned to projects`);
      }

      user.isActive = false;
      await this.repositories.user.saveUser(user);

      return null;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      const user = await this.repositories.user.findOne({ where: { id: id }, relations: ['subordinates', 'projectUsers', 'projectTargetUsers'] }) as User;
      if (!user) throw new Error(`User with ID ${id} does not exist`);

      // Check if user is a manager of other users
      if (user.subordinates.length > 0) {
        throw new Error(`Cannot delete user with ID ${id} because they are a manager of other users`);
      }

      // Check if user has any projects
      if (user.projectUsers.length > 0 || user.projectTargetUsers.length > 0) {
        throw new Error(`Cannot delete user with ID ${id} because they are assigned to projects`);
      }

      return await this.repositories.user.removeUser(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
