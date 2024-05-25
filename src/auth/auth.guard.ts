import { Injectable, CanActivate, ExecutionContext, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Check for token in authorization header
    if (!request.headers.authorization) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    // Get token from headers 
    const token = request.headers.authorization.split(' ')[1]; // Assuming 'Bearer' token format

    try {
      // Verify the token
      this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET
      });
      return true;
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
  }
}