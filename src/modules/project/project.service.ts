import { BadRequestException, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { ProjectDto } from 'src/modules/project/project.dto';
import { 
  UserRepository,
  TaskRepository,
  ClientRepository,
  ProjectRepository,
  ProjectUserRepository,
  ProjectTaskRepository,
  ProjectTargetUserRepository
} from 'src/common/repositories';

@Injectable()
export class ProjectService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly taskRepository: TaskRepository,
    private readonly clientRepository: ClientRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly projectUserRepository: ProjectUserRepository,
    private readonly projectTaskRepository: ProjectTaskRepository,
    private readonly projectTargetUserRepository: ProjectTargetUserRepository,
  ) {}

  async getProjectById(id: number): Promise<object | null> {
    try {
      const project = await this.projectRepository.getProjectById(id);
      if (!project) throw new Error("Project not found");
      
      return {
        ...project,
        users: project.projectUsers,
        tasks: project.projectTasks,
        projectTargetUsers: project.projectTargetUsers,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAll(status: number, search: string): Promise<object | null> {
    try {
      const query = this.projectRepository.createQueryBuilder('project')
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
        query.andWhere('project.name LIKE :search', { search: `%${search}%` });
        
        const customerId = await this.clientRepository.getCustomerIdByName(search);
        if (customerId) query.orWhere('project.customerId = :customerId', { customerId });
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
    const count0 = await this.projectRepository.getProjectCountByStatus(0);
    const count1 = await this.projectRepository.getProjectCountByStatus(1);
    return [{ status: 0, quantity: count0 }, { status: 1, quantity: count1 }];
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

      // Validate users exist in Users
      if (users && users.length > 0) {
        const userIds = users.map(user => user.userId);
        const existingUsers = await this.userRepository.count({ where: { id: In(userIds) } });
        if (userIds.length !== existingUsers) {
          throw new Error(`Some selected users do not exist`);
        }
      }

      // Validate tasks exist in Tasks
      if (tasks && tasks.length > 0) {
        const taskIds = tasks.map(task => task.taskId);
        const existingTasks = await this.taskRepository.count({ where: { id: In(taskIds) } });
        if (taskIds.length !== existingTasks) {
          throw new Error(`Some selected tasks do not exist`);
        }
      }

      // Validate project target users exist in Users
      if (projectTargetUsers && projectTargetUsers.length > 0) {
        const targetUserIds = projectTargetUsers.map(targetUser => targetUser.userId);
        const existingTargetUsers = await this.userRepository.count({ where: { id: In(targetUserIds) } });
        if (targetUserIds.length !== existingTargetUsers) {
          throw new Error(`Some selected target users do not exist`);
        }
      }

      // Create new project
      if (id === 0) {
        // Check for existing name
        const existingName = await this.projectRepository.getProjectByName(name);
        if (existingName) throw new Error(`Project with name ${name} already exists`);

        // Check for existing code
        const existingCode = await this.projectRepository.getProjectByCode(code);
        if (existingCode) throw new Error(`Project with code ${code} already exists`);

        // Validate customer exists
        if (customerId) {
          const customer = await this.clientRepository.getCustomerById(customerId);
          if (!customer) throw new Error(`Customer with ID ${customerId} not found`);
        }

        // Validate timeStart and timeEnd
        if (timeStart) {
          const startDate = new Date(timeStart);
          const now = new Date();
          
          const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          const startOfStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);

          if (startOfStartDate < startOfToday) {
            throw new Error('Start time cannot be earlier than today');
          }
        }
        
        if (timeStart && timeEnd) {
          const startDate = new Date(timeStart);
          const endDate = new Date(timeEnd);

          startDate.setDate(startDate.getDate() + 1);
          endDate.setDate(endDate.getDate() + 1);
          
          if (endDate <= startDate) {
            throw new Error('End time must be after start time');
          }
        }

        const newProject = {
          name, code, status, 
          note, projectType, customerId,
          notifyChannel, mezonUrl, komuChannelId, isNoticeKMSubmitTS,
          isNoticeKMRequestOffDate, isNoticeKMApproveRequestOffDate,
          isNoticeKMRequestChangeWorkingTime, isNoticeKMApproveChangeWorkingTime,
          isAllUserBelongTo, isAllowTeamBuilding,
          timeStart: timeStart ? new Date(timeStart) : undefined,
          timeEnd: timeEnd ? new Date(timeEnd) : undefined,
        };

        const savedProject = await this.projectRepository.saveProject(newProject);

        // Save project users
        if (users && users.length > 0) {
          const projectUsers = users.map(user => ({
            projectId: savedProject.id,
            userId: user.userId,
            type: user.type,
            isTemp: user.isTemp || false
          }));
          await this.projectUserRepository.saveProjectUsers(projectUsers);
        }

        // Save project tasks
        if (tasks && tasks.length > 0) {
          const projectTasks = tasks.map(task => ({
            projectId: savedProject.id,
            taskId: task.taskId,
            billable: task.billable
          }));
          await this.projectTaskRepository.saveProjectTasks(projectTasks);
        }

        // Save project target users
        if (projectTargetUsers && projectTargetUsers.length > 0) {
          const targetUsers = projectTargetUsers.map(targetUser => ({
            projectId: savedProject.id,
            userId: targetUser.userId,
            roleName: targetUser.roleName
          }));
          await this.projectTargetUserRepository.saveProjectTargetUsers(targetUsers);
        }

        return savedProject;
      }

      // Update existing project
      let project = await this.projectRepository.getProjectById(id);
      if (!project) throw new Error("Project not found");

      if (name !== project.name) {
        const existingName = await this.projectRepository.getProjectByName(name);
        if (existingName && existingName.id !== id) {
          throw new Error(`Project with name ${name} already exists`);
        }
      }

      if (code !== project.code) {
        const existingCode = await this.projectRepository.getProjectByCode(code);
        if (existingCode && existingCode.id !== id) {
          throw new Error(`Project with code ${code} already exists`);
        }
      }

      // Validate customer exists
      if (customerId && customerId !== project.customerId) {
        const customer = await this.clientRepository.getCustomerById(customerId);
        if (!customer) throw new Error(`Customer with ID ${customerId} not found`);
      }

      // Update project fields
      project.name = name;
      project.code = code;
      project.status = status;
      project.timeStart = timeStart ? new Date(timeStart) : undefined as any;
      project.timeEnd = timeEnd ? new Date(timeEnd) : undefined as any;
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

      await this.projectRepository.saveProject(project);

      // Update project users
      await this.projectUserRepository.deleteByProjectId(id);
      if (users && users.length > 0) {
        const projectUsers = users.map(user => ({
          projectId: id,
          userId: user.userId,
          type: user.type,
          isTemp: user.isTemp || false
        }));
        await this.projectUserRepository.saveProjectUsers(projectUsers);
      }

      // Update project tasks
      await this.projectTaskRepository.deleteByProjectId(id);
      if (tasks && tasks.length > 0) {
        const projectTasks = tasks.map(task => ({
          projectId: id,
          taskId: task.taskId,
          billable: task.billable
        }));
        await this.projectTaskRepository.saveProjectTasks(projectTasks);
      }

      // Update project target users
      await this.projectTargetUserRepository.deleteByProjectId(id);
      if (projectTargetUsers && projectTargetUsers.length > 0) {
        const targetUsers = projectTargetUsers.map(targetUser => ({
          projectId: id,
          userId: targetUser.userId,
          roleName: targetUser.roleName
        }));
        await this.projectTargetUserRepository.saveProjectTargetUsers(targetUsers);
      }

      return project;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async activeProject(id: number): Promise<object | null> {
    try {
      const project = await this.projectRepository.getProjectById(id);
      if (!project) throw new Error("Project not found");

      if (project.status === 0) throw new Error("Project is already active");

      project.status = 0;
      await this.projectRepository.saveProject(project);
      
      return null;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async inactiveProject(id: number): Promise<object | null> {
    try {
      const project = await this.projectRepository.getProjectById(id);
      if (!project) throw new Error("Project not found");

      if(project.status === 1) throw new Error("Project is already inactive");

      project.status = 1;
      await this.projectRepository.saveProject(project);

      return null;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteProject(id: number): Promise<void> {
    try {
      const project = await this.projectRepository.getProjectById(id);
      if (!project) throw new Error("Project not found");

      return await this.projectRepository.deleteProjectById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}