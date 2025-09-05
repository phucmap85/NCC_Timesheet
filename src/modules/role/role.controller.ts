import { Controller, Get, Put, Post, Query, Body, Delete, HttpCode, ParseIntPipe } from '@nestjs/common';
import { RoleService } from 'src/modules/role/role.service';
import { GetAllRolesDto, RoleDto } from 'src/modules/role/role.dto';
import { Permissions } from 'src/common/constants/enum';
import { HasPermissions } from 'src/common/decorators/permisson.decorator';

@Controller('Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get("GetAll")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Roles, Permissions.Admin_Roles_View)
  async getAllRoles(@Query() query: GetAllRolesDto): Promise<object | null> {
    const { Keyword = '', SkipCount = 0, MaxResultCount = 10 } = query;
    return this.roleService.getAllRoles(Keyword, SkipCount, MaxResultCount);
  }

  @Get("GetRoleForEdit")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Roles, Permissions.Admin_Roles_ViewDetail)
  async getRoleForEdit(@Query('Id', ParseIntPipe) id: number): Promise<object | null> {
    return this.roleService.getRoleForEdit(id);
  }

  @Post("ChangeRolePermission")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Roles, Permissions.Admin_Roles_Edit)
  @HttpCode(200)
  async changeRolePermission(@Body() editPermissionsAndId: object): Promise<object | null> {
    const { id, permissions } = editPermissionsAndId as { id: number; permissions: string[] };
    
    return this.roleService.changeRolePermission(id, permissions);
  }

  @Post("Create")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Roles, Permissions.Admin_Roles_AddNew)
  @HttpCode(200)
  async createRole(@Body() role: RoleDto): Promise<object | null> {
    return this.roleService.createRole(role);
  }

  @Put("Update")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Roles, Permissions.Admin_Roles_Edit)
  @HttpCode(200)
  async updateRole(@Body() role: RoleDto): Promise<object | null> {
    return this.roleService.updateRole(role);
  }

  @Delete("Delete")
  @HasPermissions(Permissions.Admin, Permissions.Admin_Roles, Permissions.Admin_Roles_Delete)
  @HttpCode(200)
  async deleteRole(@Query('Id', ParseIntPipe) id: number): Promise<void> {
    return this.roleService.deleteRole(id);
  }
}
