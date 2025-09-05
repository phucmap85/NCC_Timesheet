import { BadRequestException, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { ProjectDto } from 'src/modules/project/project.dto';
import { RepositoryManager } from 'src/common/repositories';
import { fi } from 'date-fns/locale';

@Injectable()
export class ProjectService {
  constructor(private readonly repositories: RepositoryManager) {}

  async getProjectById(id: number): Promise<object | null> {
    try {
      const project = await this.repositories.project.getProjectById(id);
      if (!project) throw new Error("Project not found");
      
      return {
        ...project,
        customer: undefined,

        users: project.projectUsers,
        projectUsers: undefined,

        tasks: project.projectTasks,
        projectTasks: undefined,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAll(status: number, search: string): Promise<object | null> {
    try {
      const query = this.repositories.project.createQueryBuilder('project')
        .leftJoinAndSelect('project.customer', 'customer')
        .leftJoinAndSelect('project.projectUsers', 'projectUsers')
        .leftJoinAndSelect('project.projectTasks', 'projectTasks')
        .leftJoinAndSelect('project.projectTargetUsers', 'projectTargetUsers')
        .leftJoinAndSelect('projectUsers.user', 'user');

      if (status !== undefined) {
        if (status < 0 || status > 1) {
          throw new Error("Invalid status value. Must be 0 or 1.");
        }
        query.where('project.status = :status', { status: status });
      }

      if (search) {
        const customerId = await this.repositories.client.getCustomerIdByName(search);
        const searchCondition = customerId 
          ? '(project.name LIKE :search OR project.customerId = :customerId)'
          : 'project.name LIKE :search';
        const searchParams = customerId 
          ? { search: `%${search}%`, customerId }
          : { search: `%${search}%` };

        if (status !== undefined) query.andWhere(searchCondition, searchParams);
        else query.where(searchCondition, searchParams);
      }

      const projects = await query.getMany();
      
      for (const project of projects) {
        project['customerName'] = project.customer ? project.customer.name : null;
        project['pms'] = project.projectUsers.filter(user => user.type === 1).map(user => user.user.fullName);
        project['activeMember'] = project.projectUsers.filter(user => user.user.isActive).length;
      }
      
      // Remove user data from projectUsers
      for (const project of projects) {
        if (project.projectUsers) {
          (project as any).projectUsers = project.projectUsers.map(({ user, ...projectUser }) => projectUser);
        }
      }
      
      return projects;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getQuantityProject(): Promise<object | null> {
    const count0 = await this.repositories.project.getProjectCountByStatus(0);
    const count1 = await this.repositories.project.getProjectCountByStatus(1);
    return [{ status: 0, quantity: count0 }, { status: 1, quantity: count1 }];
  }

  async getProjectPM(id: number): Promise<object | null> {
    try {
      const projects = await this.repositories.project.getProjectsByPMId(id);

      return projects.map(project => ({
        id: project.id,
        name: project.name,
        code: project.customer ? project.customer.name : null,
      }));
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getProjectsIncludingTasks(userId: number): Promise<object | null> {
    try {
      const projects = await this.repositories.project.getProjectsByUserId(userId);

      return await Promise.all(projects.map(async project => {
        const projectUsers = await this.repositories.projectUser.getProjectUsersByProjectId(project.id);
        
        return {
          id: project.id,
          
          customerName: project.customer ? project.customer.name : null,
          
          projectCode: project.code,
          projectName: project.name,
          projectUserType: project.projectUsers.find(user => user.user.id === userId)?.type,
          
          listPM: projectUsers.filter(user => user.type === 1).map(user => user.user.fullName),
          
          tasks: project.projectTasks.map(task => ({
            projectTaskId: task.id,
            billable: task.billable,
            isDefault: false,
            taskName: task.task ? task.task.name : null
          })),

          targetUsers: project.projectTargetUsers.map(targetUser => ({
            projectTargetUserId: targetUser.userId,
            userName: targetUser.user ? targetUser.user.userName : null
          })),
        };
      }));
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  
  async saveProject(projectDto: ProjectDto): Promise<object | null> {
    try {
      const {
        id = 0, name, code, status,
        timeStart, timeEnd, note, projectType,
        customerId, users, tasks, projectTargetUsers,
        notifyChannel, mezonUrl, komuChannelId,
        isNoticeKMSubmitTS, isNoticeKMRequestOffDate,
        isNoticeKMApproveRequestOffDate, isNoticeKMRequestChangeWorkingTime,
        isNoticeKMApproveChangeWorkingTime, isAllUserBelongTo,
        isAllowTeamBuilding
      } = projectDto;

      // Validate users
      if (users && users.length > 0) {
        // Validate users exist in Users
        const userIds = users.map(user => user.userId);
        const existingUsers = await this.repositories.user.count({ where: { id: In(userIds) } });
        if (userIds.length !== existingUsers) {
          throw new Error(`Some selected users do not exist`);
        }

        // Validate have at least one PM in user list
        const hasPM = users.some(user => user.type === 1);
        if (!hasPM) throw new Error('At least one PM must be selected');
      } else {
        throw new Error('At least one user must be selected');
      }

      // Validate tasks exist in Tasks
      if (tasks && tasks.length > 0) {
        const taskIds = tasks.map(task => task.taskId);
        const existingTasks = await this.repositories.task.count({ where: { id: In(taskIds) } });
        if (taskIds.length !== existingTasks) {
          throw new Error(`Some selected tasks do not exist`);
        }
      } else {
        throw new Error('At least one task must be selected');
      }

      // Validate project target users
      if (projectTargetUsers && projectTargetUsers.length > 0) {
        // Validate have at least one Shadow in user list
        const hasShadow = users.some(user => user.type === 2);
        if (!hasShadow) throw new Error('At least one Shadow must be selected to assign target users');

        // Validate target users exist in Users
        const targetUserIds = projectTargetUsers.map(targetUser => targetUser.userId);
        const existingTargetUsers = await this.repositories.user.count({ where: { id: In(targetUserIds) } });
        if (targetUserIds.length !== existingTargetUsers) {
          throw new Error(`Some selected target users do not exist`);
        }
      }

      // Create new project
      if (id === 0) {
        // Check for existing name
        const existingName = await this.repositories.project.getProjectByName(name);
        if (existingName) throw new Error(`Project with name ${name} already exists`);

        // Check for existing code
        const existingCode = await this.repositories.project.getProjectByCode(code);
        if (existingCode) throw new Error(`Project with code ${code} already exists`);

        // Validate customer exists
        if (customerId) {
          const customer = await this.repositories.client.getCustomerById(customerId);
          if (!customer) throw new Error(`Customer with ID ${customerId} not found`);
        }

        // Validate timeStart and timeEnd
        const startDateWFormat = new Date(new Date(timeStart).getTime() + 7 * 60 * 60 * 1000);
        const startDate = new Date(startDateWFormat.toISOString().split('T')[0]);
        const endDateWFormat = new Date(new Date(timeEnd).getTime() + 7 * 60 * 60 * 1000);
        const endDate = new Date(endDateWFormat.toISOString().split('T')[0]);
        const now = new Date();
        
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startOfStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

        if (startOfStartDate < startOfToday) throw new Error('Start time cannot be earlier than today');
        if (endDate < startDate) throw new Error('End time must be after start time');

        const newProject = {
          name, code, status, 
          note, projectType, customerId,
          notifyChannel, mezonUrl, komuChannelId, isNoticeKMSubmitTS,
          isNoticeKMRequestOffDate, isNoticeKMApproveRequestOffDate,
          isNoticeKMRequestChangeWorkingTime, isNoticeKMApproveChangeWorkingTime,
          isAllUserBelongTo, isAllowTeamBuilding,
          timeStart: startDate ? startDate : undefined,
          timeEnd: endDate ? endDate : undefined
        };

        const savedProject = await this.repositories.project.saveProject(newProject);

        // Save project users
        if (users && users.length > 0) {
          const projectUsers = users.map(user => ({
            projectId: savedProject.id,
            userId: user.userId,
            type: user.type,
            isTemp: user.isTemp || false
          }));
          await this.repositories.projectUser.saveProjectUsers(projectUsers);
        }

        // Save project tasks
        if (tasks && tasks.length > 0) {
          const projectTasks = tasks.map(task => ({
            projectId: savedProject.id,
            taskId: task.taskId,
            billable: task.billable
          }));
          await this.repositories.projectTask.saveProjectTasks(projectTasks);
        }

        // Save project target users
        if (projectTargetUsers && projectTargetUsers.length > 0) {
          const targetUsers = projectTargetUsers.map(targetUser => ({
            projectId: savedProject.id,
            userId: targetUser.userId,
            roleName: targetUser.roleName
          }));
          await this.repositories.projectTargetUser.saveProjectTargetUsers(targetUsers);
        }

        return savedProject;
      }

      // Update existing project
      let project = await this.repositories.project.getProjectById(id);
      if (!project) throw new Error("Project not found");

      if (name !== project.name) {
        const existingName = await this.repositories.project.getProjectByName(name);
        if (existingName && existingName.id !== id) {
          throw new Error(`Project with name ${name} already exists`);
        }
      }

      if (code !== project.code) {
        const existingCode = await this.repositories.project.getProjectByCode(code);
        if (existingCode && existingCode.id !== id) {
          throw new Error(`Project with code ${code} already exists`);
        }
      }

      // Validate customer exists
      if (customerId && customerId !== project.customerId) {
        const customer = await this.repositories.client.getCustomerById(customerId);
        if (!customer) throw new Error(`Customer with ID ${customerId} not found`);
      }

      // Validate timeStart and timeEnd
      const startDateWFormat = new Date(new Date(timeStart).getTime() + 7 * 60 * 60 * 1000);
      const startDate = new Date(startDateWFormat.toISOString().split('T')[0]);
      const endDateWFormat = new Date(new Date(timeEnd).getTime() + 7 * 60 * 60 * 1000);
      const endDate = new Date(endDateWFormat.toISOString().split('T')[0]);
      if (endDate < startDate) throw new Error('End time must be after start time');

      // Validate cannot change project tasks if timesheets have been logged under those tasks
      const existingProjectTasks = await this.repositories.projectTask.getProjectTasksByProjectId(id);
      const allTimesheets = await this.repositories.timesheet.getTimesheetsWithProjectTaskIds(existingProjectTasks.map(pt => pt.id));
      
      const filteredProjectTasks = existingProjectTasks.filter(pt => !tasks.some(t => t.taskId === pt.taskId));
      const allFilteredTimesheets = allTimesheets.filter(ts => filteredProjectTasks.some(fpt => fpt.id === ts.projectTaskId));
      if (allFilteredTimesheets && allFilteredTimesheets.length > 0) {
        throw new Error('Some tasks cannot be removed because timesheets have been logged under these tasks');
      }

      // Validate cannot change project users if timesheets have been logged under those users
      const existingProjectUsers = await this.repositories.projectUser.getProjectUsersByProjectId(id);
      const filteredProjectUsers = existingProjectUsers.filter(pu => !users.some(u => u.userId === pu.userId));
      const timesheetsOfFilteredUsers = allTimesheets.filter(ts => filteredProjectUsers.some(fpu => fpu.userId === ts.userId));
      if (timesheetsOfFilteredUsers && timesheetsOfFilteredUsers.length > 0) {
        throw new Error('Some users cannot be removed because timesheets have been logged under these users');
      }

      // Validate cannot change project target users if timesheets have been logged under those target users
      const existingProjectTargetUsers = await this.repositories.projectTargetUser.getProjectTargetUsersByProjectId(id);
      const filteredProjectTargetUsers = projectTargetUsers && projectTargetUsers.length > 0 ? 
        existingProjectTargetUsers.filter(ptu => !projectTargetUsers.some(ntu => ntu.userId === ptu.userId))
        : existingProjectTargetUsers;
      const timesheetsOfFilteredTargetUsers = allTimesheets.filter(ts => 
        filteredProjectTargetUsers.some(fptu => ts.targetTimesheet && fptu.userId === ts.targetTimesheet.userId)
      );
      if (timesheetsOfFilteredTargetUsers && timesheetsOfFilteredTargetUsers.length > 0) {
        throw new Error('Some target users cannot be removed because timesheets have been logged under these target users');
      }

      // Update project fields
      project.name = name;
      project.code = code;
      project.status = status;
      project.timeStart = startDate ? startDate : undefined as any;
      project.timeEnd = endDate ? endDate : undefined as any;
      project.note = note || undefined as any;
      project.projectType = projectType;
      project.customerId = customerId;
      project.notifyChannel = notifyChannel;
      project.mezonUrl = mezonUrl || undefined as any;
      project.komuChannelId = komuChannelId || undefined as any;
      project.isNoticeKMSubmitTS = isNoticeKMSubmitTS || false;
      project.isNoticeKMRequestOffDate = isNoticeKMRequestOffDate || false;
      project.isNoticeKMApproveRequestOffDate = isNoticeKMApproveRequestOffDate || false;
      project.isNoticeKMRequestChangeWorkingTime = isNoticeKMRequestChangeWorkingTime || false;
      project.isNoticeKMApproveChangeWorkingTime = isNoticeKMApproveChangeWorkingTime || false;
      project.isAllUserBelongTo = isAllUserBelongTo;
      project.isAllowTeamBuilding = isAllowTeamBuilding;

      await this.repositories.project.saveProject(project);

      // Update project users
      await this.repositories.projectUser.deleteByProjectId(id);
      if (users && users.length > 0) {
        const projectUsers = users.map(user => ({
          projectId: id,
          userId: user.userId,
          type: user.type,
          isTemp: user.isTemp || false
        }));
        await this.repositories.projectUser.saveProjectUsers(projectUsers);
      }

      // Update project tasks
      // Delete only tasks that are not in the new tasks list (filteredProjectTasks)
      if (filteredProjectTasks && filteredProjectTasks.length > 0) {
        await this.repositories.projectTask.deleteByProjectTaskIds(
          filteredProjectTasks.map(pt => pt.id)
        );
      }
      // Upsert tasks from the new tasks list
      if (tasks && tasks.length > 0) {
        const updateTasks = existingProjectTasks
          .filter(pt => tasks.some(t => t.taskId === pt.taskId))
          .map(ut => {
            const matchedTask = tasks.find(t => t.taskId === ut.taskId);
            if (matchedTask) ut.billable = matchedTask.billable;
            return ut;
          });
        
        await this.repositories.projectTask.saveProjectTasks(updateTasks);

        const newTasks = tasks.filter(t => !existingProjectTasks.some(pt => pt.taskId === t.taskId))
          .map(t => ({
            projectId: id,
            taskId: t.taskId,
            billable: t.billable
          }));
        await this.repositories.projectTask.saveProjectTasks(newTasks);
      }

      // Update project target users
      await this.repositories.projectTargetUser.deleteByProjectId(id);
      if (projectTargetUsers && projectTargetUsers.length > 0) {
        const targetUsers = projectTargetUsers.map(targetUser => ({
          projectId: id,
          userId: targetUser.userId,
          roleName: targetUser.roleName
        }));
        await this.repositories.projectTargetUser.saveProjectTargetUsers(targetUsers);
      }

      return project;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async activeProject(id: number): Promise<object | null> {
    try {
      const project = await this.repositories.project.getProjectById(id);
      if (!project) throw new Error("Project not found");

      if (project.status === 0) throw new Error("Project is already active");

      project.status = 0;
      await this.repositories.project.saveProject(project);
      
      return null;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async inactiveProject(id: number): Promise<object | null> {
    try {
      const project = await this.repositories.project.getProjectById(id);
      if (!project) throw new Error("Project not found");

      if(project.status === 1) throw new Error("Project is already inactive");

      project.status = 1;
      await this.repositories.project.saveProject(project);

      return null;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteProject(id: number): Promise<void> {
    try {
      const project = await this.repositories.project.getProjectById(id);
      if (!project) throw new Error("Project not found");

      // Validate cannot change project if timesheets have been logged
      const projectTasks = await this.repositories.projectTask.getProjectTasksByProjectId(id);
      const allTimesheets = await this.repositories.timesheet.getTimesheetsWithProjectTaskIds(
        projectTasks.map(pt => pt.id)
      );
      if(allTimesheets && allTimesheets.length > 0) {
        throw new Error('Cannot delete project because timesheets have been logged under this project');
      }

      return await this.repositories.project.deleteProjectById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}