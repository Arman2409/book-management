import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import type { SignInBody, SignUpBody } from '../../../types/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('signin')
  async signIn(
    @Body() signInBody: SignInBody,
  ): Promise<{ access_token: string }> {
    return await this.service.signIn(signInBody);
  }

  @Post('signup')
  async signUp(
    @Body() signUpBody: SignUpBody,
  ): Promise<{ access_token: string }> {
    return await this.service.signUp(signUpBody);
  }
}
