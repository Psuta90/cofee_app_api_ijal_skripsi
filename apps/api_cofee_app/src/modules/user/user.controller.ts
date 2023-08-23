import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '@app/jwt/jwt_guard/jwt_guard.guard';
import { RoleGuardGuard } from '../../role-guard/role-guard.guard';
import { Roles } from 'libs/custom_decorators/roles.decorators';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }
  @UseGuards(JwtAuthGuard,RoleGuardGuard)
  @Roles(1)
  @Get("list")
  async findAll() {
    return await this.userService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @UseGuards(JwtAuthGuard,RoleGuardGuard)
  @Roles(1)
  @Delete('deleted/:id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
