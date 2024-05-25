import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { minPasswordLength } from '../../../../configs/auth';

@Injectable()
export class AuthValidationService {
  private readonly emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  public validateEmailAndPassword(email: string, password: string): void {
    if (!email || !password) {
      throw new HttpException(
        'Both email and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isValidEmail = this.emailRegex.test(email);
    if (!isValidEmail) {
      throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
    }

    const isValidPassword =
      password.length >= minPasswordLength && // Minimum length check
      /[0-9]+/.test(password); // Contains a number
    if (!isValidPassword) {
      throw new HttpException(
        `Password should be at least ${minPasswordLength} characters length and include numbers`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
