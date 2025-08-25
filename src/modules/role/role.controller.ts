import { Controller, Get, Put, Post, Query, Body, Delete, HttpCode, ParseIntPipe } from '@nestjs/common';
import { RoleService } from 'src/modules/role/role.service';
import { GetAllRolesDto, RoleDto } from 'src/modules/role/role.dto';

@Controller('Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get("GetAll")
  async getAllRoles(@Query() query: GetAllRolesDto): Promise<object | null> {
    const { Keyword = '', SkipCount = 0, MaxResultCount = 10 } = query;
    return this.roleService.getAllRoles(Keyword, SkipCount, MaxResultCount);
  }

  @Get("GetRoleForEdit")
  async getRoleForEdit(@Query('Id', ParseIntPipe) id: number): Promise<object | null> {
    return this.roleService.getRoleForEdit(id);
  }

  @Post("ChangeRolePermission")
  @HttpCode(200)
  async changeRolePermission(@Body() editPermissionsAndId: object): Promise<object | null> {
    const { id, permissions } = editPermissionsAndId as { id: number; permissions: string[] };
    
    return this.roleService.changeRolePermission(id, permissions);
  }

  @Post("Create")
  @HttpCode(200)
  async createRole(@Body() role: RoleDto): Promise<object | null> {
    return this.roleService.createRole(role);
  }

  @Put("Update")
  @HttpCode(200)
  async updateRole(@Body() role: RoleDto): Promise<object | null> {
    return this.roleService.updateRole(role);
  }

  @Delete("Delete")
  @HttpCode(200)
  async deleteRole(@Query('Id', ParseIntPipe) id: number): Promise<void> {
    return this.roleService.deleteRole(id);
  }
}
