import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/strategies/local-auth.guard';
import { CreateUserDTO } from './dtos/UserDTO';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  @Post('/user')
  async createUser(@Body() createUser: CreateUserDTO): Promise<User> {
    return this.usersService.createUser(createUser);
  }
}
