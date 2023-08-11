import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { UserType } from '../modules/user/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.signIn(body.username, body.password);
  }

  @Post('register')
  async newUser(
    @Body() body: { username: string; password: string; type: UserType },
  ) {
    return this.userService.createUser(body.username, body.password, body.type);
  }
}
