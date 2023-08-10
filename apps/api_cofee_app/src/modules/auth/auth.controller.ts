import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuth } from './dto/login-auth.dto';
import { AdminLoginGuard } from './premission-guard/adminLoginGuard.guard';


@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.register(createAuthDto);
  }

  @Post('login')
  async login(@Body() LoginAuthDto : LoginAuth) {
    return this.authService.login(LoginAuthDto);
  }

  @UseGuards(AdminLoginGuard)
  @Post('login/admin')
  async loginAdmin(@Body() LoginAuthDto : LoginAuth) {
    return this.authService.loginadmin(LoginAuthDto);
  }
}
