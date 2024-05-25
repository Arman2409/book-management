import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import type { User } from '../../types/auth';

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

  @Post("singIn")
  async signIn(@Body() signInBody: User): Promise<{access_token: string}> {
    return await this.service.signIn(signInBody);
  }


  @Post('signUp')
  async signUp(@Body() signUpBody: User): Promise<{access_token: string}> {
    return await this.service.signUp(signUpBody);
  }
}
